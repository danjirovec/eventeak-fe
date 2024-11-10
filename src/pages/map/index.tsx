// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useOne, useParsed } from '@refinedev/core';
import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import THEME from 'util/globals';
import { v4 as uuidv4 } from 'uuid';
import { example } from './idk';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

let rows = {};
let firstTime = false;
let canvas = null;
let json = null;
const r = 7;
// const eventData = example;
let startPointer = null;
let isDragging = false;
const sensitivity = 0.5;

type params = {
  eventId: string;
};

export const Map = () => {
  const canvasDivRef = useRef(null);
  const [tickets, setTickets] = useState([]);
  const { params } = useParsed<params>();
  const eventId = params?.eventId;

  const seatMap = JSON.parse(window.seatMap);


  // const { data, isLoading, error } = useOne({
  //   resource: 'events',
  //   id: eventId,
  //   meta: {
  //     fields: ['seatMap'],
  //   },
  // });

  // const seatMap = data?.data.seatMap;

  // if (error) {
  //   alert(typeof eventId);
  // }

  // if (window.seatMap) {
  //   const yo = JSON.parse(window.seatMap);
  //   try {
  //     alert(yo.primitives[0].type);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  window.addEventListener('resize', () => {
    if (canvasDivRef && canvasDivRef.current && canvas) {
      const width = canvasDivRef.current.clientWidth;
      const height = canvasDivRef.current.clientHeight;
      canvas.setWidth(width);
      canvas.setHeight(height);
    }
  });

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
    // if (!firstTime) {
    //   firstTime = true;
    //   return;
    // }
    if (!seatMap) {
      return;
    }
    canvas = initCanvas();
    const width = canvasDivRef.current.clientWidth;
    const height = canvasDivRef.current.clientHeight;
    canvas.setWidth(width);
    canvas.setHeight(height);
    fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.statefullCache = false;
    fabric.Object.prototype.noScaleCache = true;
    fabric.Object.prototype.hasBorders = false;

    canvas.setBackgroundColor(THEME.background);

    canvas.on('mouse:down', function (event) {
      isDragging = true;
      startPointer = canvas.getPointer(event.e);
    });

    canvas.on('mouse:move', function (event) {
      if (!isDragging || !startPointer) return;
      const pointer = canvas.getPointer(event.e);
      const zoom = canvas.getZoom();

      const distanceX = (pointer.x - startPointer.x) * sensitivity * zoom;
      const distanceY = (pointer.y - startPointer.y) * sensitivity * zoom;
      canvas.viewportTransform[4] += distanceX;
      canvas.viewportTransform[5] += distanceY;
      canvas.requestRenderAll();
      startPointer = pointer;
    });

    canvas.on('mouse:up', function () {
      isDragging = false;
      canvas.setViewportTransform(canvas.viewportTransform);
    });

    canvas.preserveObjectStacking = true;
    canvas.renderOnAddRemove = false;

    if (seatMap) {
      loadDesign(seatMap);
      centerCanvasToObjectsWithPadding(canvas);
      canvas.setViewportTransform(canvas.viewportTransform);
    }
    firstTime = false;

    window.canvas = canvas;
    window.setTickets = setTickets;
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.off('before:transform');
      canvas.on('before:transform', (e) => {
        handleSeatSelection(e.transform.target, tickets);
      });
    }
  }, [seatMap, tickets]);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      selection: false,
      perPixelTargetFind: true,
      targetFindTolerance: 5,
    });

  const serialize = (seats) => {
    const serialized = [];
    seats.forEach((element) => {
      serialized.push({
        seatId: element.seatId,
        sectionId: element.sectionId,
        epcId: element.pcId,
        epcPrice: element.pcPrice,
        id: element.id,
        ticketId: element.tickedId,
        sectionName: element.sectionName,
        seatNumber: element.seatNumber,
        seatIndex: element.seatIndex,
        rowName: element.rowName,
        reserved: element.reserved,
        price: element.price,
        rowId: element.rowId,
        sectionColor: element.sectionColor,
      });
    });
    return serialized;
  };

  const handleSeatSelection = (seat, selected) => {
    if (seat.reserved) {
      return;
    }

    const found = selected.find((item) => item.id == seat.id);

    if (!found) {
      seat.fill = 'red';
      const updated = [...selected, seat];
      setTickets(updated);
      window.ReactNativeWebView.postMessage(JSON.stringify(serialize(updated)));
      window.tickets = updated;
    } else {
      seat.fill = seat.sectionColor;
      const filtered = selected.filter((item) => seat.id !== item.id);
      setTickets(filtered);
      window.ReactNativeWebView.postMessage(
        JSON.stringify(serialize(filtered)),
      );
      window.tickets = filtered;
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

  const zoomIn = () => {
    const zoom = canvas.getZoom();
    const center = canvas.getCenter();
    canvas.zoomToPoint({ x: center.left, y: center.top }, zoom * 1.5);
    canvas.requestRenderAll();
  };

  const zoomOut = () => {
    const zoom = canvas.getZoom();
    const center = canvas.getCenter();
    canvas.zoomToPoint({ x: center.left, y: center.top }, zoom / 1.5);
    canvas.requestRenderAll();
  };

  return (
    <div
      ref={canvasDivRef}
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <canvas id="canvas"></canvas>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          gap: '10px',
          padding: '10px',
        }}
      >
        <Button
          onClick={zoomOut}
          icon={<MinusOutlined />}
          style={{ padding: 20 }}
        />
        <Button
          onClick={zoomIn}
          icon={<PlusOutlined />}
          style={{ padding: 20 }}
        />
      </div>
    </div>
  );
};
