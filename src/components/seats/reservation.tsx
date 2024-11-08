// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import THEME from 'util/globals';
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';

let rows = {};
let firstTime = false;
let canvas = null;
let json = null;
let globalZoom = 0;
const r = 7;

const SeatReservation = ({ eventData, tickets, setTickets, removed }) => {
  const canvasDivRef = useRef(null);
  const [localTickets, setLocalTickets] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const selectionWarning = (type: NotificationType) => {
    api[type]({
      message: "You can't select available and unavailable seats",
    });
  };

  window.addEventListener('resize', () => {
    if (canvasDivRef && canvasDivRef.current && canvas) {
      const width = canvasDivRef.current.clientWidth;
      const height = canvasDivRef.current.clientHeight;
      canvas.setWidth(width);
      canvas.setHeight(height);
    }
  });

  const handleMouseClick = (e) => {
    if (e.altKey === true) {
      canvas.isDragging = true;
      canvas.selection = false;
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
      canvas.requestRenderAll();
      return;
    }
  };

  function hanldeMouseOver(e) {
    if (canvas.isDragging) {
      const vpt = canvas.viewportTransform;
      vpt[4] += e.clientX - canvas.lastPosX;
      vpt[5] += e.clientY - canvas.lastPosY;
      canvas.requestRenderAll();
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
    }
  }

  const loadDesign = (jsonMap) => {
    json = jsonMap;

    canvas.requestRenderAll();
    canvas.clear();
    canvas.setBackgroundColor(THEME.background);
    Object.keys(rows).forEach((key) => delete rows[key]);

    rows = {};

    for (const key in json.rows) {
      rows[key] = { ...json.rows[key] };
      let pos = [json.rows[key].startX, json.rows[key].startY];
      const u = [...json.rows[key].directionUnitVector];
      const numberOfSeats = json.rows[key].numberOfSeats;
      const c = 2 * r + json.rows[key].spacing / 2;
      const startFrom = json.rows[key].startSeatsFrom;
      rows[key].seats = json.rows[key].seats;

      // row label
      const text = new fabric.Text(`${json.rows[key].rowName}`, {
        fontSize: r * 2,
        textAlign: 'bottom',
        originX: 'center',
        originY: 'center',
        fill: 'black',
        left: pos[0] - c * u[0] + r,
        top: pos[1] - c * u[1] + r,
        selectable: false,
        evented: false,
        lockMovementX: true,
        lockScalingY: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingFlip: true,
        lockScalingX: true,
        lockSkewingX: true,
        lockSkewingY: true,
        lockUniScaling: true,
        hasControls: false,
        objectCaching: false,
        fontFamily: 'Inconsolata',
      });
      canvas.add(text);
      // draw row
      for (let i = 0; i < numberOfSeats; ++i) {
        const seat = new fabric.Circle({
          fill: json.rows[key].sectionColor,
          top: pos[1],
          left: pos[0],
          radius: r,
          lockMovementX: true,
          lockScalingY: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingFlip: true,
          lockScalingX: true,
          lockSkewingX: true,
          lockSkewingY: true,
          lockUniScaling: true,
          hasControls: false,
          selectable: true,
          objectCaching: false,
        });

        const text = new fabric.Text(`${startFrom + i}`, {
          fontSize: r,
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          left: pos[0] + r,
          top: pos[1] + r,
          selectable: false,
          evented: false,
          lockMovementX: true,
          lockScalingY: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingFlip: true,
          lockScalingX: true,
          lockSkewingX: true,
          lockSkewingY: true,
          lockUniScaling: true,
          hasControls: false,
          objectCaching: false,
          fontFamily: 'Inconsolata',
        });

        seat.groupId = key;
        seat.isStart = false;
        seat.isEnd = false;
        seat.id = uuidv4();
        seat.sectionName = json.rows[key].seats[i].sectionName ?? null;
        seat.sectionId = json.rows[key].seats[i].sectionId ?? null;
        seat.sectionColor = json.rows[key].sectionColor ?? null;
        seat.seatId = json.rows[key].seats[i].seatId ?? null;
        seat.rowId = json.rows[key].seats[i].rowId ?? null;
        seat.seatNumber = json.rows[key].seats[i].seatNumber ?? null;
        seat.pcId = json.rows[key].seats[i].pcId ?? null;
        seat.pcPrice = json.rows[key].seats[i].pcPrice ?? null;
        seat.price = json.rows[key].seats[i].pcPrice ?? null;
        seat.seatIndex = i;
        seat.reserved = json.rows[key].seats[i].reserved;
        seat.validated = json.rows[key].seats[i].ticketId ? false : null;
        seat.ticketId = json.rows[key].seats[i].ticketId ?? null;
        if (seat.reserved) seat.set('fill', '#cccccc');
        seat.rowName = json.rows[key].rowName;

        if (i == 0) seat.isStart = true;
        if (i == numberOfSeats - 1) seat.isEnd = true;

        pos = [pos[0] + c * u[0], pos[1] + c * u[1]];
        // rows[key].seats.push(seat);

        canvas.add(seat);
        canvas.add(text);
      }
    }

    for (const primitive of json.primitives) {
      if (primitive.type == 'i-text') {
        const text = new fabric.Text(primitive.text, {
          ...primitive,
          selectable: false,
          evented: false,
          objectCaching: false,
          fontFamily: 'Inconsolata',
        });
        canvas.add(text);
      } else if (primitive.type == 'rect') {
        const rect = new fabric.Rect({
          ...primitive,
          selectable: false,
          evented: false,
          objectCaching: false,
        });
        canvas.add(rect);
        canvas.sendToBack(rect);
      }
    }

    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (canvas) {
      const removedTickets = localTickets.filter(
        (localTicket) =>
          !tickets.some((ticket) => ticket.id === localTicket.id),
      );
      clearTickets(removedTickets);
      setLocalTickets(tickets);
      canvas.requestRenderAll();
    }
  }, [removed]);

  useEffect(() => {
    if (canvas && eventData) {
      canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
      loadDesign(eventData.seatMap);
      centerCanvasToObjectsWithPadding(canvas);
      canvas.setViewportTransform(canvas.viewportTransform);
    }
    console.log('eventData useEffect', firstTime, canvas, json);
  }, [eventData]);

  useEffect(() => {
    if (!firstTime) {
      console.log('main useEffect firstTime is FALSE')
      firstTime = true;
      return;
    }
    console.log('main useEffect firstTime is TRUE');
    canvas = initCanvas();
    const width = canvasDivRef.current.clientWidth;
    const height = canvasDivRef.current.clientHeight;
    canvas.setWidth(width);
    canvas.setHeight(height);
    fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.statefullCache = false;
    fabric.Object.prototype.noScaleCache = true;
    fabric.Object.prototype.hasBorders = false;

    globalZoom = canvas.getZoom();

    canvas.setBackgroundColor(THEME.background);

    canvas.hoverCursor = 'pointer';
    canvas.selectionKey = 'shiftKey';
    canvas.selection = false;

    canvas.off('mouse:down');
    canvas.on('mouse:down', (e) => handleMouseClick(e.e));

    canvas.off('mouse:move');
    canvas.on('mouse:move', (e) => {
      hanldeMouseOver(e.e);
    });

    canvas.remove('mouse:wheel');
    canvas.on('mouse:wheel', function (opt) {
      globalZoom = canvas.getZoom();
      const delta = opt.e.deltaY;
      if (delta < 0) globalZoom += 0.1;
      else globalZoom -= 0.1;
      if (globalZoom > 20) globalZoom = 20;
      if (globalZoom < 0.1) globalZoom = 0.1;

      opt.e.preventDefault();
      opt.e.stopPropagation();
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, globalZoom);
      canvas.renderAll();
    });

    canvas.remove('mouse:up');
    canvas.on('mouse:up', function () {
      canvas.setViewportTransform(canvas.viewportTransform);
      canvas.isDragging = false;
      canvas.selection = false;
    });

    canvas.preserveObjectStacking = true;
    canvas.renderOnAddRemove = false;

    if (eventData) {
      console.log('main useEffect eventData exist')
      loadDesign(eventData.seatMap);
      centerCanvasToObjectsWithPadding(canvas);
      canvas.setViewportTransform(canvas.viewportTransform);
    }
    firstTime = false;
  }, []);

  const handleSelectionClear = (tickets) => {
    clearTickets(tickets);
    setLocalTickets([]);
    setTickets([]);
    canvas.requestRenderAll();
  };

  const clearTickets = (tickets) => {
    tickets.forEach((seat) => {
      if (seat.discount) {
        seat.discount = null;
        seat.price = seat.pcPrice;
      }
      if (!seat.reserved) {
        seat.fill = seat.sectionColor;
      } else {
        seat.fill = '#cccccc';
      }
    });
  };

  useEffect(() => {
    if (canvas) {
      canvas.off('before:transform');
      canvas.on('before:transform', (e) => {
        handleSeatSelection(e.transform.target, tickets);
      });

      canvas.off('selection:cleared');
      canvas.on('selection:cleared', () => {
        handleSelectionClear(tickets);
      });
    }
  }, [eventData, tickets]);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      selection: false,
      perPixelTargetFind: true,
      targetFindTolerance: 5,
    });

  const handleSeatSelection = (seat, selected) => {
    if (selected.length > 0 && seat.reserved !== selected[0].reserved) {
      handleSelectionClear(tickets);
      selectionWarning('warning');
      return;
    }

    const found = selected.find((item) => item.id == seat.id);

    if (!found) {
      seat.fill = 'red';
      setLocalTickets([...selected, seat]);
      setTickets([...selected, seat]);
    } else {
      if (seat.reserved) {
        seat.fill = '#cccccc';
      } else {
        seat.fill = seat.sectionColor;
      }
      const filteredTickets = selected.filter((item) => seat.id !== item.id);
      setLocalTickets(filteredTickets);
      setTickets(filteredTickets);
    }

    const activeObject = canvas.getActiveObject();
    activeObject.set('lockScalingX', true);
    activeObject.set('lockScalingY', true);
    activeObject.set('lockMovementX', true);
    activeObject.set('lockMovementY', true);
    activeObject.set('lockRotation', true);
    activeObject.set('lockScalingFlip', true);
    activeObject.set('lockSkewingX', true);
    activeObject.set('lockSkewingY', true);
    activeObject.set('lockUniScaling', true);
    activeObject.set('hasControls', false);
    activeObject.set('hasBorders', false);
    canvas.requestRenderAll();
  };

  function centerCanvasToObjectsWithPadding(canvas, padding = 20) {
    const objects = canvas.getObjects();

    if (objects.length === 0) return;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    objects.forEach((obj) => {
      const boundingRect = obj.getBoundingRect();

      minX = Math.min(minX, boundingRect.left);
      minY = Math.min(minY, boundingRect.top);
      maxX = Math.max(maxX, boundingRect.left + boundingRect.width);
      maxY = Math.max(maxY, boundingRect.top + boundingRect.height);
    });

    const paddedBoundingRect = {
      left: minX - padding,
      top: minY - padding,
      width: maxX - minX + 2 * padding,
      height: maxY - minY + 2 * padding,
    };

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const scaleX = canvasWidth / paddedBoundingRect.width;
    const scaleY = canvasHeight / paddedBoundingRect.height;

    const scaleFactor = Math.min(scaleX, scaleY);

    canvas.setZoom(scaleFactor);

    const viewportX =
      (canvasWidth - paddedBoundingRect.width * scaleFactor) / 2;
    const viewportY =
      (canvasHeight - paddedBoundingRect.height * scaleFactor) / 2;

    canvas.viewportTransform = [
      scaleFactor,
      0,
      0,
      scaleFactor,
      -paddedBoundingRect.left * scaleFactor + viewportX,
      -paddedBoundingRect.top * scaleFactor + viewportY,
    ];

    canvas.requestRenderAll();
  }

  return (
    <div
      ref={canvasDivRef}
      style={{
        minHeight: '500px',
        maxHeight: '70vh',
        height: '70vh',
        width: '100%',
      }}
    >
      {contextHolder}
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default SeatReservation;
