// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { fabric } from 'fabric';
import THEME from '../../util/globals';
import {
  Button,
  Input,
  InputNumber,
  Space,
  Select,
  ColorPicker,
  notification,
} from 'antd';
import { DeleteButton } from '@refinedev/antd';

const seatColor = THEME.secondary;
class RowGroup {
  groupId = -1;
  startX = -1;
  startY = -1;
  endX = -1;
  endY = -1;
  directionUnitVector = [-1, -1];
  spacing = -1;
  numberOfSeats = 0;
  seats = [];
  sectionName = 'None';
  sectionColor = seatColor;
  rowName = -1;
  startSeatsFrom = 1;
  group = null;
}

function addSeatToRow(rowGroup, direction, currSelectedActiveObj = null) {
  if (!rowGroup) return null;

  const start = rowGroup.seats[0];
  const end = rowGroup.seats[rowGroup.seats.length - 1];

  if (!start || !end) return null;

  rowGroup.numberOfSeats += 1;

  const directionUnitVector = [...rowGroup.directionUnitVector];

  const posX = direction == 1 ? rowGroup.endX : rowGroup.startX;
  const posY = direction == 1 ? rowGroup.endY : rowGroup.startY;
  const c = 2 * r + rowGroup.spacing / 2;
  const pos = [
    posX + c * directionUnitVector[0] * direction,
    posY + c * directionUnitVector[1] * direction,
  ];

  const seat = new fabric.Circle({
    radius: r,
    left: pos[0],
    top: pos[1],
    fill: rowGroup.sectionColor,
    hasControls: false,
    hasBorders: false,
    hasRotatingPoint: false,
    originX: 'center',
    originY: 'center',
  });

  if (direction == 1) {
    rowGroup.endX = pos[0];
    rowGroup.endY = pos[1];
    seat.isEnd = true;
    end.isEnd = false;
    rowGroup.seats.push(seat);
  } else if (direction == -1) {
    rowGroup.startX = pos[0];
    rowGroup.startY = pos[1];
    seat.isStart = true;
    start.isEnd = false;
    rowGroup.seats.unshift(seat);
  }
  seat.groupId = rowGroup.groupId;

  return seat;
}

const minSpacing = 1;
const maxSpacing = 40;

let groups = {};

const strokePreviewColor = THEME.secondary;
const canvasBackGround = THEME.background;
const r = 7;
const spacing = 2.5;
const rowSpacing = 10;

let sections = [['None', seatColor]];
let addRowClicked = 0;
let addRowSegmentedClicked = 0;
let addMultilineRowClicked = 0;
let firstAddRowClicked = 0;
let prevSeatPosX = 0;
let prevSeatPosY = 0;
let startRowPos = [-1, -1];
let endRowPos = [-1, -1];
let directionUnitVector = [-1 - 1];
let time = Date.now();
let currentSeatsInRow = [];

let currentGroupId = 1;
let currentMulitlineRowId = -1;
let currentGroupNumberOfSeats = 0;

const currSelectedGoupObj = null;
let lastActiveSelectionPos = [-1, -1];

let startingSeat_1 = null;

let donePreview = true;
let firstTime = false;

type KeyValueObject = {
  [key: string]: string | Date | number | object;
};

const SeatDesigner = forwardRef((props: KeyValueObject, ref) => {
  const { jsonData } = props;

  useImperativeHandle(ref, () => ({
    getData() {
      return exportToJson();
    },
  }));

  const { editor, onReady } = useFabricJSEditor();
  const [api, contextHolder] = notification.useNotification();

  const [lastMousePos, setLastMousePos] = useState([-1, -1]);

  const [currSelectedGoup, setCurrSelectedGroup] = useState([]);
  const [currSelectedPrimitive, setCurrSelectedPrimitive] = useState([]);

  const [sectionName, setSectionName] = useState('');
  const [rerender, setRerender] = useState(0);
  const [rowName, setRowName] = useState('');
  const [startingSeat, setStartingSeat] = useState(1);
  const [sectionColor, setSectionColor] = useState('#000');
  const [rowAngle, setRowAngle] = useState(0);

  const canvasDivRef = useRef(null);
  const rowAngleInput = useRef(null);
  const primColorIn = useRef(null);
  const primRotIn = useRef(null);

  useEffect(() => {
    firstTime = false;
    sections = [['None', seatColor]];
  }, []);

  const sectionAdded = (type: NotificationType) => {
    api[type]({
      message: 'Section added',
    });
  };
  const rowsLabeled = (type: NotificationType) => {
    api[type]({
      message: 'Rows named',
    });
  };
  const sectionAddFailed = (type: NotificationType) => {
    api[type]({
      message: 'Section with this name already exists',
    });
  };

  const onAddRow = () => {
    addRowClicked = 1;
    addRowSegmentedClicked = 0;
  };

  const onAddRectangle = () => {
    const rect = new fabric.Rect({
      fill: '#3498db',
      width: 200,
      height: 150,
      left: editor.canvas.width / 2,
      top: editor.canvas.height / 2,
      originX: 'center',
      originY: 'center',
    });
    rect.groupId = [];
    editor.canvas.add(rect);
    editor.canvas.sendToBack(rect);
    editor.canvas.requestRenderAll();
  };

  const onAddText = () => {
    const text = new fabric.IText('Text', {
      fontsize: 14,

      left: editor.canvas.width / 2,
      top: editor.canvas.height / 2,
      originX: 'center',
      originY: 'center',
      fontFamily: 'Inconsolata',
    });
    text.groupId = [];
    editor.canvas.add(text);
    editor.canvas.requestRenderAll();
  };

  const onAddSegmentedRow = () => {
    addRowSegmentedClicked = 1;
    addRowClicked = 0;
  };

  const calculateUnitVector = (start, end) => {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const dist2 = dx * dx + dy * dy;

    const d = Math.sqrt(dist2);
    const directionOfMovingUnitVector = [dx / d, dy / d];
    return directionOfMovingUnitVector;
  };

  const getGroup = (groupId) => {
    return groups[groupId].seats;
  };

  const onAddSeatToSelectedRowFromStart = () => {
    if (currSelectedGoup.length != 1) return;
    const group = groups[currSelectedGoup[0]];
    if (!group) return;

    editor.canvas.requestRenderAll();

    const seat = addSeatToRow(group, -1);
    if (!seat) return;
    group.group.addWithUpdate(seat);
    editor.canvas.renderAll();

    lastActiveSelectionPos = [group.group.left, group.group.top];

    setCurrSelectedGroup([currSelectedGoup[0]]);
    setRowName(groups[currSelectedGoup[0]].rowName);
    setStartingSeat(groups[currSelectedGoup[0]].startSeatsFrom);
  };

  const onAddSeatToSelectedRowFromEnd = () => {
    if (currSelectedGoup.length != 1) return;

    const group = groups[currSelectedGoup[0]];
    if (!group) return;

    const seat = addSeatToRow(group, 1);
    if (!seat) return;

    group.group.addWithUpdate(seat);
    editor.canvas.renderAll();

    lastActiveSelectionPos = [group.group.left, group.group.top];

    setCurrSelectedGroup([currSelectedGoup[0]]);
    setRowName(groups[currSelectedGoup[0]].rowName);
    setStartingSeat(groups[currSelectedGoup[0]].startSeatsFrom);
  };

  const calculateUnitVectorDirection = (v) => {
    const norm = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    return [v[0] / norm, v[1] / norm];
  };

  useEffect(() => {
    if (!donePreview) return;

    donePreview = false;
    if (lastMousePos[0] >= 0) {
      const [x, y] = lastMousePos;
      if (addMultilineRowClicked == 2) {
        editor.canvas.requestRenderAll();
        for (const x of currentSeatsInRow) editor.canvas.remove(x);

        currentSeatsInRow = [];
        // adding multiple rows
        const prevGroupID = currentMulitlineRowId;
        const group = groups[prevGroupID];
        if (!group) {
          donePreview = true;
          return;
        }

        const [sx, sy] = [group.startX, group.startY];
        const [ex, ey] = [group.endX, group.endY];
        const [v0x, v0y] = [ex - sx, ey - sy];

        const [v1x, v1y] = [x - sx, y - sy];
        const [v2x, v2y] = [x - ex, y - ey];

        const p = v0x * v1y - v0y * v1x;

        const d1 = v1x * v1x + v1y * v1y;
        const d2 = v2x * v2x + v2y * v2y;

        let d = d1 > d2 ? d2 : d1;
        d = Math.sqrt(d);
        const [n1x, n1y] = [-v0y, v0x];
        const [n2x, n2y] = [v0y, -v0x];

        const n1u = calculateUnitVectorDirection([n1x, n1y]);
        const n2u = calculateUnitVectorDirection([n2x, n2y]);

        const n = p < 0 ? n2u : n1u;

        const numOfRows = Math.floor(d / (rowSpacing + 2 * r));

        //
        const seats = [];

        for (let i = 0; i < numOfRows; ++i) {
          for (let j = 0; j < group.numberOfSeats; ++j) {
            const pos = [
              n[0] * (rowSpacing + 2 * r) * (i + 1) +
                (sx +
                  (2 * r + group.spacing / 2) *
                    group.directionUnitVector[0] *
                    j),
              n[1] * (rowSpacing + 2 * r) * (i + 1) +
                (sy +
                  (2 * r + group.spacing / 2) *
                    group.directionUnitVector[1] *
                    j),
            ];

            //
            const seat = new fabric.Circle({
              radius: r,
              left: pos[0],
              top: pos[1],
              fill: seatColor,
              hasControls: false,
              hasBorders: false,
              hasRotatingPoint: false,
              originX: 'center',
              originY: 'center',
              evented: false,
              selectable: false,
            });

            seat.groupId = currentGroupId;
            seat.isStart = false;
            seat.isEnd = false;

            if (j == 0) seat.isStart = true;
            if (j == group.numberOfSeats - 1) seat.isEnd = true;

            editor.canvas.add(seat);

            seats.push(seat);
          }
          currentGroupId += 1;
        }

        currentSeatsInRow = [...seats];
        editor.canvas.renderAll();
        donePreview = true;
        return;
      }

      if (!addRowClicked && !addMultilineRowClicked) {
        donePreview = true;
        return;
      }
      //
      editor.canvas.requestRenderAll();
      for (const x of currentSeatsInRow) editor.canvas.remove(x);

      const dx = x - prevSeatPosX;
      const dy = y - prevSeatPosY;
      const dist2 = dx * dx + dy * dy;

      currentSeatsInRow = [];

      if (dist2 > 4 * r * r) {
        const d = Math.sqrt(dist2) - r;
        const numbrOfCircles = Math.floor(
          (d - spacing / 2) / (2 * r + spacing / 2),
        );
        const directionOfMovingUnitVector = [dx / d, dy / d];

        directionUnitVector = [...directionOfMovingUnitVector];
        const seats = [];

        let prevX = prevSeatPosX;
        let prevY = prevSeatPosY;
        const c = 2 * r + spacing / 2;
        for (let i = 0; i < numbrOfCircles; ++i) {
          const pos = [
            prevX + c * directionOfMovingUnitVector[0],
            prevY + c * directionOfMovingUnitVector[1],
          ];

          prevX = pos[0];
          prevY = pos[1];

          const seat = new fabric.Circle({
            radius: r,
            left: pos[0],
            top: pos[1],
            fill: seatColor,
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
            originX: 'center',
            originY: 'center',
            evented: false,
            selectable: false,
          });
          seat.groupId = currentGroupId;
          if (i == numbrOfCircles - 1) seat.isEnd = true;
          editor.canvas.add(seat);
          seats.push(seat);

          endRowPos = [...pos];
        }
        currentGroupNumberOfSeats = 1 + numbrOfCircles;
        currentSeatsInRow = seats;
        editor.canvas.renderAll();
      }
    }
    donePreview = true;
  }, [lastMousePos]);

  function hanldeMouseOver(e) {
    if (!donePreview) return;

    const pos = editor.canvas.getPointer(e);
    if (editor.canvas.isDragging) {
      const vpt = editor.canvas.viewportTransform;
      vpt[4] += e.clientX - editor.canvas.lastPosX;
      vpt[5] += e.clientY - editor.canvas.lastPosY;
      editor.canvas.lastPosX = e.clientX;
      editor.canvas.lastPosY = e.clientY;
      editor.canvas.renderAll();
      return;
    }

    if (
      (addRowClicked || addMultilineRowClicked || addRowSegmentedClicked) &&
      !firstAddRowClicked
    ) {
      editor.canvas.requestRenderAll();
      const prevSeat =
        editor.canvas.getObjects()[editor.canvas.getObjects().length - 1];
      if (prevSeat && prevSeat.preview) {
        editor.canvas.remove(prevSeat);
      }

      const _previewSeat = new fabric.Circle({
        radius: r,
        left: pos.x,
        top: pos.y,
        fill: '#ecf0f1',
        stroke: strokePreviewColor,
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        originX: 'center',
        originY: 'center',
        evented: false,
        selectable: false,
        opacity: '0.8',
      });
      _previewSeat.preview = true;
      editor.canvas.add(_previewSeat);
      editor.canvas.renderAll();
    }
    if (firstAddRowClicked) {
      const prev = time;
      const curr = Math.floor(Date.now());

      if (curr - prev < 34) return;
      time = curr;
      const x = pos.x;
      const y = pos.y;

      if (
        Math.abs(x - lastMousePos[0]) > r ||
        Math.abs(y - lastMousePos[1]) > r
      )
        setLastMousePos([x, y]);
      return;
    }
  }

  const handleMouseClick = (e) => {
    if (!donePreview) return;

    const pos = editor.canvas.getPointer(e);

    if (e.altKey === true) {
      editor.canvas.isDragging = true;
      editor.canvas.selection = false;
      editor.canvas.lastPosX = e.clientX;
      editor.canvas.lastPosY = e.clientY;
      return;
    }

    if (addRowClicked || addRowSegmentedClicked || addMultilineRowClicked) {
      const x = pos.x;
      const y = pos.y;
      if (!firstAddRowClicked) {
        const prevSeat =
          editor.canvas.getObjects()[editor.canvas.getObjects().length - 1];
        if (prevSeat && prevSeat.preview) editor.canvas.remove(prevSeat);
        firstAddRowClicked = 1;
        prevSeatPosX = x;
        prevSeatPosY = y;
        const startX = x;
        const startY = y;
        const seat = new fabric.Circle({
          radius: r,
          left: startX,
          top: startY,
          fill: seatColor,
          hasControls: false,
          hasBorders: false,
          hasRotatingPoint: false,
          originX: 'center',
          originY: 'center',
          evented: false,
          selectable: false,
        });
        seat.groupId = currentGroupId;
        seat.isStart = true;
        editor.canvas.add(seat);

        startingSeat_1 = seat;

        startRowPos = [startX, startY];
        currentMulitlineRowId = currentGroupId;
      } else {
        if (addRowSegmentedClicked) {
          if (
            Math.abs(prevSeatPosX - x) < 10 &&
            Math.abs(prevSeatPosY - y) < 10
          ) {
            currentSeatsInRow = [];
            firstAddRowClicked = 0;
            addRowSegmentedClicked = 0;
            currentGroupId += 1;

            startRowPos = [-1, -1];
            endRowPos = [-1, -1];
            directionUnitVector = [-1, -1];
          } else {
            startRowPos = [endRowPos[0], endRowPos[1]];
            currentSeatsInRow = []; //TODO:
            prevSeatPosX = endRowPos[0];
            prevSeatPosY = endRowPos[1];
          }
        } else if (addMultilineRowClicked) {
          if (addMultilineRowClicked == 1) {
            addMultilineRowClicked = 2;
            const group = new RowGroup();
            group.groupId = currentMulitlineRowId;
            group.startX = startRowPos[0];
            group.startY = startRowPos[1];
            group.endX = endRowPos[0] == -1 ? startRowPos[0] : endRowPos[0];
            group.endY = endRowPos[1] == -1 ? startRowPos[1] : endRowPos[1];
            group.directionUnitVector = [...directionUnitVector];
            groups[currentMulitlineRowId] = group;
            group.numberOfSeats = currentGroupNumberOfSeats;
            group.spacing = spacing;

            if (startingSeat_1) group.seats.push(startingSeat_1);
            for (const seat of currentSeatsInRow) group.seats.push(seat);

            const sel = new fabric.ActiveSelection(group.seats, {
              canvas: editor.canvas,
              // angle: 90,
              originX: 'center',
              originY: 'center',
              lockScalingFlip: true,
              lockScalingX: true,
              lockScalingY: true,
              lockSkewingX: true,
              lockSkewingY: true,
              lockUniScaling: true,
            }).toGroup();
            sel.set('lockScalingFlip', true);
            sel.set('lockScalingX', true);
            sel.set('lockScalingY', true);
            sel.set('lockSkewingX', true);
            sel.set('lockSkewingY', true);
            sel.set('lockUniScaling', true);
            sel.set('hasBorders', false);
            sel.groupId = [currentGroupId];

            group.group = sel;

            currentSeatsInRow = [];
            currentGroupId += 1;
          } else if (addMultilineRowClicked == 2) {
            const prevGroup = groups[currentMulitlineRowId];

            if (!prevGroup) return;
            editor.canvas.requestRenderAll();
            for (const seat of currentSeatsInRow) {
              if (seat.isStart) {
                const group = new RowGroup();
                group.groupId = seat.groupId;
                group.startX = seat.left;
                group.startY = seat.top;
                group.spacing = spacing;
                group.numberOfSeats = prevGroup.numberOfSeats;
                group.directionUnitVector = [...prevGroup.directionUnitVector];
                groups[group.groupId] = group;
                group.seats.push(seat);
              } else {
                const group = groups[seat.groupId];
                group.seats.push(seat);
              }

              if (seat.isEnd) {
                const group = groups[seat.groupId];
                group.endX = seat.left;
                group.endY = seat.top;

                const sel = new fabric.ActiveSelection(group.seats, {
                  canvas: editor.canvas,
                  originX: 'center',
                  originY: 'center',
                  lockScalingFlip: true,
                  lockScalingX: true,
                  lockScalingY: true,
                  lockSkewingX: true,
                  lockSkewingY: true,
                  lockUniScaling: true,
                }).toGroup();
                sel.set('hasBorders', false);
                sel.set('lockScalingFlip', true);
                sel.set('lockScalingX', true);
                sel.set('lockScalingY', true);
                sel.set('lockSkewingX', true);
                sel.set('lockSkewingY', true);
                sel.set('lockUniScaling', true);
                sel.groupId = [seat.groupId];

                group.group = sel;

                currentGroupId = seat.groupId + 1;
              }
            }
            editor.canvas.discardActiveObject();

            editor.canvas.renderAll();
            setRerender((prev) => !prev);

            currentSeatsInRow = [];
            startRowPos = [-1, -1];
            endRowPos = [-1, -1];
            directionUnitVector = [-1, -1];
            currentGroupNumberOfSeats = 0;
            addMultilineRowClicked = 0;
            addRowClicked = 0;
            firstAddRowClicked = 0;
            currentMulitlineRowId = -1;
          }
        } else if (addRowClicked) {
          const group = new RowGroup();
          group.groupId = currentGroupId;
          group.startX = startRowPos[0];
          group.startY = startRowPos[1];
          group.endX = endRowPos[0] == -1 ? startRowPos[0] : endRowPos[0];
          group.endY = endRowPos[1] == -1 ? startRowPos[1] : endRowPos[1];
          group.directionUnitVector = [...directionUnitVector];
          groups[currentGroupId] = group;
          group.numberOfSeats = currentGroupNumberOfSeats;
          group.spacing = spacing;

          if (startingSeat_1) group.seats.push(startingSeat_1);
          for (const seat of currentSeatsInRow) group.seats.push(seat);
          const sel = new fabric.ActiveSelection(group.seats, {
            canvas: editor.canvas,
            originX: 'center',
            originY: 'center',
            lockScalingFlip: true,
            lockScalingX: true,
            lockScalingY: true,
            lockSkewingX: true,
            lockSkewingY: true,
            lockUniScaling: true,
          }).toGroup();
          sel.set('hasBorders', false);
          sel.set('lockScalingFlip', true);
          sel.set('lockScalingX', true);
          sel.set('lockScalingY', true);
          sel.set('lockSkewingX', true);
          sel.set('lockSkewingY', true);
          sel.set('lockUniScaling', true);
          sel.groupId = [currentGroupId];

          group.group = sel;

          editor.canvas.discardActiveObject();

          editor.canvas.renderAll();

          currentSeatsInRow = [];
          firstAddRowClicked = 0;
          addRowClicked = 0;
          currentGroupId += 1;
          currentGroupNumberOfSeats = 0;
          startRowPos = [-1, -1];
          endRowPos = [-1, -1];
          directionUnitVector = [-1, -1];
          lastActiveSelectionPos = [sel.left, sel.top];
        }
      }
    }
  };

  const handleObjectSelection = (e) => {
    const set = new Set();
    const groupIdsSelected = [];
    const primitives = [];
    if (e.e.shiftKey && e.selected[0] && e.selected[0].group) {
      for (const selected of e.selected[0].group._objects) {
        if (selected.type == 'rect' || selected.type == 'i-text') {
          primitives.push(selected);
          continue;
        }
        const currGroupId = selected.groupId;
        if (!currGroupId || !currGroupId.length || currGroupId.length != 1)
          continue;
        if (set.has(currGroupId[0])) continue;
        set.add(currGroupId[0]);

        groupIdsSelected.push(currGroupId[0]);
      }
      editor.canvas.getActiveObject().set('hasBorders', false);
      if (e.selected[0].group._objects.length == 1) {
        lastActiveSelectionPos = [
          editor.canvas.getActiveObject().left,
          editor.canvas.getActiveObject().top,
        ];
      } else {
        lastActiveSelectionPos = [
          editor.canvas.getActiveObject().left +
            editor.canvas.getActiveObject().width / 2,
          editor.canvas.getActiveObject().top +
            editor.canvas.getActiveObject().height / 2,
        ];
      }
    } else {
      for (const selectedObj of e.selected) {
        if (selectedObj.type == 'rect' || selectedObj.type == 'i-text') {
          primitives.push(selectedObj);
          continue;
        }
        const currGroupId = selectedObj.groupId;
        if (!currGroupId || !currGroupId.length || currGroupId.length != 1)
          continue;
        if (set.has(currGroupId[0])) continue;
        set.add(currGroupId[0]);

        groupIdsSelected.push(currGroupId[0]);
      }

      if (e.selected.length == 1)
        lastActiveSelectionPos = [
          editor.canvas.getActiveObject().left,
          editor.canvas.getActiveObject().top,
        ];
      else
        lastActiveSelectionPos = [
          editor.canvas.getActiveObject().left +
            editor.canvas.getActiveObject().width / 2,
          editor.canvas.getActiveObject().top +
            editor.canvas.getActiveObject().height / 2,
        ];
    }

    if (groupIdsSelected.length != 0) {
      editor.canvas.getActiveObject().set('lockScalingFlip', true);
      editor.canvas.getActiveObject().set('lockScalingX', true);
      editor.canvas.getActiveObject().set('lockScalingY', true);
      editor.canvas.getActiveObject().set('lockSkewingX', true);
      editor.canvas.getActiveObject().set('lockSkewingY', true);
      editor.canvas.getActiveObject().set('lockUniScaling', true);
      editor.canvas.getActiveObject().set('hasBorders', false);
    }
    editor.canvas.getActiveObject().set('groupId', groupIdsSelected);
    editor.canvas.renderAll();

    setCurrSelectedGroup([...groupIdsSelected]);
    setCurrSelectedPrimitive([...primitives]);
    if (groupIdsSelected.length > 0 && groups[groupIdsSelected[0]]) {
      setRowName(groups[groupIdsSelected[0]].rowName);
      setStartingSeat(groups[groupIdsSelected[0]].startSeatsFrom);
    }
  };

  const handleObjectTransfromation = (e) => {
    const gids = e.target.groupId;
    let posNew = [];
    if (gids.length > 0) {
      if (gids.length == 1) {
        posNew = [
          editor.canvas.getActiveObject().left,
          editor.canvas.getActiveObject().top,
        ];
      } else {
        posNew = [
          editor.canvas.getActiveObject().left +
            editor.canvas.getActiveObject().width / 2,
          editor.canvas.getActiveObject().top +
            editor.canvas.getActiveObject().height / 2,
        ];
      }
      for (const gid of gids) {
        const group = groups[gid];
        if (!group) continue;
        setRowName(groups[gid].rowName);
        setStartingSeat(groups[gid].startSeatsFrom);

        if (e.action == 'drag') {
          const d = [
            posNew[0] - lastActiveSelectionPos[0],
            posNew[1] - lastActiveSelectionPos[1],
          ];

          group.startX += d[0];
          group.startY += d[1];
          group.endX += d[0];
          group.endY += d[1];
        } else if (e.action == 'rotate') {
          const w = e.target.width;
          const h = e.target.height;
          const theta = e.target.angle;
          const thetaRad = (-theta * Math.PI) / 180;

          const [x, y] = [
            group.startX - lastActiveSelectionPos[0],
            lastActiveSelectionPos[1] - group.startY,
          ];
          const [xe, ye] = [
            group.endX - lastActiveSelectionPos[0],
            lastActiveSelectionPos[1] - group.endY,
          ];
          const [x1, y1] = [
            x * Math.cos(thetaRad) -
              y * Math.sin(thetaRad) +
              lastActiveSelectionPos[0],
            lastActiveSelectionPos[1] -
              x * Math.sin(thetaRad) -
              y * Math.cos(thetaRad),
          ];
          const [x2, y2] = [
            xe * Math.cos(thetaRad) -
              ye * Math.sin(thetaRad) +
              lastActiveSelectionPos[0],
            lastActiveSelectionPos[1] -
              xe * Math.sin(thetaRad) -
              ye * Math.cos(thetaRad),
          ];

          group.startX = x1;
          group.startY = y1;
          group.endX = x2;
          group.endY = y2;
          group.directionUnitVector = calculateUnitVector(
            [group.startX, group.startY],
            [group.endX, group.endY],
          );
        }
      }
    }
    lastActiveSelectionPos = [...posNew];
  };

  const handleWindowClick = (e) => {
    if (!editor) return;

    if (e.key == 'Delete') {
      e.preventDefault();
      e.stopPropagation();
      onDeleteRow();
    }
  };

  if (editor && !firstTime) {
    firstTime = true;
    const width = canvasDivRef.current.clientWidth;
    const height = canvasDivRef.current.clientHeight;
    editor.canvas.setWidth(width);
    editor.canvas.setHeight(height);
    editor.canvas.setBackgroundColor(canvasBackGround);
    editor.canvas.off('mouse:down');
    editor.canvas.on('mouse:down', (e) => handleMouseClick(e.e));

    editor.canvas.off('mouse:move');
    editor.canvas.on('mouse:move', (e) => hanldeMouseOver(e.e));

    editor.canvas.off('selection:created');
    editor.canvas.on('selection:created', (e) => handleObjectSelection(e));

    editor.canvas.off('selection:updated');
    editor.canvas.on('selection:updated', (e) => handleObjectSelection(e));

    editor.canvas.off('selection:cleared');
    editor.canvas.on('selection:cleared', (e) => {
      //
      setCurrSelectedGroup([]);
      setCurrSelectedPrimitive([]);
    });

    editor.canvas.off('object:modified');
    editor.canvas.on('object:modified', (e) => handleObjectTransfromation(e));

    editor.canvas.remove('mouse:wheel');
    editor.canvas.on('mouse:wheel', function (opt) {
      const delta = opt.e.deltaY;
      let zoom = editor.canvas.getZoom();
      if (delta < 0) zoom += 0.01;
      else zoom -= 0.01;

      if (zoom > 20) zoom = 20;
      if (zoom < 0.05) zoom = 0.05;

      editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
      editor.canvas.requestRenderAll();
    });
    editor.canvas.remove('mouse:up');
    editor.canvas.on('mouse:up', function (opt) {
      editor.canvas.setViewportTransform(editor.canvas.viewportTransform);
      editor.canvas.isDragging = false;
      editor.canvas.selection = true;
    });
    editor.canvas.renderAll();
    editor.canvas.preserveObjectStacking = true;
  }

  const getNumberOfSeatsInGroup = () => {
    if (currSelectedGoup.length != 1) return 0;
    const group = groups[currSelectedGoup[0]];
    if (!group) return 0;
    return group.numberOfSeats;
  };

  const getSpacingGroup = () => {
    if (currSelectedGoup.length != 1) return 0;
    const group = groups[currSelectedGoup[0]];
    if (!group) return 0;
    return group.spacing;
  };

  const handleChangeNumberOfSeats = (value) => {
    const newNum = Math.floor(Number(value)) - 1;
    if (newNum < 0) return;
    if (currSelectedGoup.length != 1) return 0;
    const group = groups[currSelectedGoup[0]];
    if (!group) return 0;
    editor.canvas.requestRenderAll();
    const startObj = group.seats[0];

    for (const obj of group.seats) {
      if (!obj.isStart) {
        group.group.removeWithUpdate(obj);
      }
    }
    if (!startObj) return;
    group.seats = [startObj];
    group.numberOfSeats = 1;
    group.endX = group.startX;
    group.endY = group.startY;

    for (let i = 0; i < newNum; i++) {
      const seat = addSeatToRow(group, 1);
      if (!seat) return;
      group.group.addWithUpdate(seat);
    }
    editor.canvas.renderAll();
    lastActiveSelectionPos = [group.group.left, group.group.top];
    setRerender((prev) => !prev);
  };

  const handleChangeSpacing = (value) => {
    if (currSelectedGoup.length != 1) return 0;

    let newSpacing = Math.floor(Number(value));
    if (newSpacing > maxSpacing) newSpacing = maxSpacing;
    if (newSpacing < minSpacing) newSpacing = minSpacing;
    const group = groups[currSelectedGoup[0]];
    if (!group) return 0;
    editor.canvas.requestRenderAll();
    const startObj = group.seats[0];
    for (const obj of group.seats) {
      if (!obj.isStart) group.group.removeWithUpdate(obj);
    }

    if (!startObj) return;

    group.seats = [startObj];

    const numOfSeats = group.numberOfSeats;
    group.numberOfSeats = 1;
    group.spacing = newSpacing;
    group.endX = group.startX;
    group.endY = group.startY;

    for (let i = 1; i < numOfSeats; ++i) {
      const seat = addSeatToRow(group, 1);
      if (!seat) return;
      group.group.addWithUpdate(seat);
    }

    lastActiveSelectionPos = [group.group.left, group.group.top];

    editor.canvas.renderAll();

    setRerender((prev) => !prev);
  };

  const onDeleteRow = () => {
    setRowName(-1);
    setStartingSeat(1);
    editor.canvas.discardActiveObject();
    editor.canvas.requestRenderAll();

    for (const gid of currSelectedGoup) {
      const group = groups[gid];
      if (!group) continue;
      editor.canvas.remove(group.group);
      groups[gid] = null;
      delete groups[gid];
    }

    for (const primitive of currSelectedPrimitive) {
      editor.canvas.remove(primitive);
    }

    editor.canvas.renderAll();
    setCurrSelectedGroup([]);
    setCurrSelectedPrimitive([]);
  };

  const selectGroupOfRows = (rows, gid) => {
    const sel = new fabric.ActiveSelection(rows, {
      canvas: editor.canvas,
    });

    sel.set('lockScalingX', true);
    sel.set('lockScalingY', true);
    sel.groupId = [gid];
    editor.canvas._setActiveObject(sel);
    lastActiveSelectionPos = [sel.left, sel.top];
    editor.canvas.requestRenderAll();
    setCurrSelectedGroup([gid]);
  };

  const onAutomaticRowLabeling = () => {
    let rowName = 1;
    for (const key in groups) {
      if (!groups[key]) continue;
      if (currSelectedGoup.length == 1 && currSelectedGoup[0] == key)
        setRowName(rowName);
      groups[key].rowName = rowName;
      rowName += 1;
    }
    rowsLabeled('success');
  };

  const getRowName = () => {
    if (currSelectedGoup.length != 1 || !groups[currSelectedGoup[0]]) return;
    return groups[currSelectedGoup[0]].rowName
      ? groups[currSelectedGoup[0]].rowName
      : -1;
  };

  const handleChangeRowLabel = (e) => {
    if (currSelectedGoup.length != 1 || !groups[currSelectedGoup[0]]) return;
    groups[currSelectedGoup[0]].rowName = e.target.value;
    setRowName(e.target.value);
  };

  const onDuplicateRow = () => {
    editor.canvas.requestRenderAll();

    const newGroupsIds = [];
    const selected = [];

    const set = new Set();
    const groupIdsSelected = [];
    const primitives = [];

    for (const gid of currSelectedGoup) {
      const group = groups[gid];

      if (!group) continue;

      const newGroupId = currentGroupId;
      currentGroupId += 1;

      const newGroupObj = new RowGroup();
      newGroupObj.groupId = newGroupId;
      newGroupObj.startX = group.startX + 20;
      newGroupObj.startY = group.startY + 20;
      newGroupObj.endX = group.endX + 20;
      newGroupObj.endY = group.endY + 20;
      newGroupObj.directionUnitVector = [...group.directionUnitVector];
      newGroupObj.numberOfSeats = group.numberOfSeats;
      newGroupObj.spacing = group.spacing;
      newGroupObj.sectionName = group.sectionName;
      newGroupObj.sectionColor = group.sectionColor;
      newGroupObj.rowName = group.rowName;
      newGroupObj.startSeatsFrom = group.startSeatsFrom;
      groups[newGroupId] = newGroupObj;

      newGroupsIds.push(newGroupId);

      const x = group.seats[0];

      let prevX = newGroupObj.startX;
      let prevY = newGroupObj.startY;
      const c = 2 * r + newGroupObj.spacing / 2;

      for (let i = 0; i < newGroupObj.numberOfSeats; ++i) {
        let pos = [
          prevX + c * newGroupObj.directionUnitVector[0],
          prevY + c * newGroupObj.directionUnitVector[1],
        ];

        if (i == 0) {
          pos = [prevX, prevY];
        }

        prevX = pos[0];
        prevY = pos[1];

        const seat = new fabric.Circle({
          radius: r,
          left: pos[0],
          top: pos[1],
          fill: group.sectionColor,
          angle: x.angle,
          scaleX: x.scaleX,
          scaleY: x.scaleY,
          zoomX: x.zoomX,
          zoomY: x.zoomY,
          hasControls: false,
          hasBorders: false,
          hasRotatingPoint: false,
          originX: 'center',
          originY: 'center',
        });
        seat.groupId = newGroupId;
        if (i == newGroupObj.numberOfSeats - 1) seat.isEnd = true;
        if (i == 0) seat.isStart = true;
        editor.canvas.add(seat);
        newGroupObj.seats.push(seat);
      }
      editor.canvas.discardActiveObject();
      const sel = new fabric.ActiveSelection(newGroupObj.seats, {
        canvas: editor.canvas,
        originX: 'center',
        originY: 'center',
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
        lockUniScaling: true,
      }).toGroup();
      sel.set('lockScalingFlip', true);
      sel.set('lockScalingX', true);
      sel.set('lockScalingY', true);
      sel.set('lockSkewingX', true);
      sel.set('lockSkewingY', true);
      sel.set('lockUniScaling', true);
      sel.set('hasBorders', false);
      sel.groupId = [newGroupId];

      newGroupObj.group = sel;
      selected.push(sel);
    }

    for (const selectedObj of selected) {
      if (selectedObj.type == 'rect' || selectedObj.type == 'i-text') {
        primitives.push(selectedObj);
        continue;
      }
      const currGroupId = selectedObj.groupId;
      if (!currGroupId || !currGroupId.length || currGroupId.length != 1)
        continue;
      if (set.has(currGroupId[0])) continue;
      set.add(currGroupId[0]);

      groupIdsSelected.push(currGroupId[0]);
    }

    let activeSel = null;
    if (newGroupsIds.length == 1)
      activeSel = new fabric.ActiveSelection(selected, {
        canvas: editor.canvas,
        originX: 'center',
        originY: 'center',
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
        lockUniScaling: true,
      });
    else
      activeSel = new fabric.ActiveSelection(selected, {
        canvas: editor.canvas,
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
        lockUniScaling: true,
      });

    activeSel.set('hasBorders', false);
    editor.canvas.discardActiveObject();
    editor.canvas._setActiveObject(activeSel);

    if (newGroupsIds.length == 1)
      lastActiveSelectionPos = [activeSel.left, activeSel.top];
    else
      lastActiveSelectionPos = [
        activeSel.left + activeSel.width / 2,
        activeSel.top + activeSel.height / 2,
      ];

    activeSel.set('groupId', groupIdsSelected);

    editor.canvas.renderAll();

    setCurrSelectedGroup([...groupIdsSelected]);
    setCurrSelectedPrimitive([...primitives]);

    editor.canvas.renderAll();
    setRerender((prev) => !prev);
  };

  const onAddMultilineRow = () => {
    addMultilineRowClicked = 1;
  };

  const onAddCategory = () => {
    if (sectionName != '') {
      for (const section of sections) {
        if (section[0] == sectionName) {
          sectionAddFailed('error');
          return;
        }
      }
      sectionAdded('success');
      sections.push([sectionName, sectionColor]);
      setRerender(!rerender);
    }
  };

  const onCategoryNameChange = (e) => {
    setSectionName(e.target.value);
  };

  const onCategoryColorChange = (value, hex) => {
    setSectionColor(hex);
  };

  const onChangeSelectCategory = (value) => {
    const section = value;
    let color = '';
    for (const c of sections) {
      if (c[0] == section) {
        color = c[1];
        break;
      }
    }
    for (const gid of currSelectedGoup) {
      const groupObjs = getGroup(gid);
      const group = groups[gid];
      group.sectionName = section;
      group.sectionColor = color;
      for (const obj of groupObjs) {
        obj.set('fill', color);
        obj.sectionName = section;
        obj.sectionColor = color;
      }
    }
    editor.canvas.requestRenderAll();
    setRerender(!rerender);
  };

  const getCategory = () => {
    if (currSelectedGoup.length != 1) return;
    const group = groups[currSelectedGoup[0]];
    if (!group) return;
    if (group.sectionName) return group.sectionName;
    return 'None';
  };

  const handleChangeStartSeat = (value) => {
    if (currSelectedGoup.length != 1) return;
    const group = groups[currSelectedGoup[0]];
    if (!group) return;
    const v = Number(value);
    group.startSeatsFrom = v > 0 ? v : 1;
    setStartingSeat(v);
  };

  const exportToJson = () => {
    editor.canvas.discardActiveObject();
    const newGroups = {};
    for (const key in groups) {
      if (!groups[key]) continue;
      newGroups[key] = { ...groups[key] };
      newGroups[key].seats = [];
      for (let i = 0; i < groups[key].numberOfSeats; ++i)
        newGroups[key].seats.push({
          seatNumber: i + groups[key].startSeatsFrom,
          reserved: false,
          sectionName: groups[key].sectionName,
        });
      newGroups[key].group = null;
    }
    const primitives = [];
    for (const obj of editor.canvas.getObjects()) {
      if (obj.groupId && obj.groupId.length == 0) {
        primitives.push(obj.toJSON());
      }
    }
    const myData = {
      groups: newGroups,
      sections: sections,
      primitives: primitives,
    };
    sections = [['None', seatColor]];
    groups = {};
    return myData;
  };

  const loadFromJson = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const jsonDesign = JSON.parse(text);

      loadDesign(jsonDesign);
    };
    if (e.target.files.length != 0) reader.readAsText(e.target.files[0]);
  };

  const loadDesign = (jsonData) => {
    editor.canvas.clear();

    Object.keys(groups).forEach((key) => delete groups[key]);

    groups = {};
    sections = [...jsonData.sections];

    for (const key in jsonData.groups) {
      groups[key] = { ...jsonData.groups[key] };
      let pos = [jsonData.groups[key].startX, jsonData.groups[key].startY];
      const u = [...jsonData.groups[key].directionUnitVector];
      const numberOfSeats = jsonData.groups[key].numberOfSeats;
      const c = 2 * r + jsonData.groups[key].spacing / 2;
      const startFrom = jsonData.groups[key].startSeatsFrom;
      groups[key].seats = [];

      const text = new fabric.Text(`${jsonData.groups[key].rowName}`, {
        fontSize: r * 2,
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        fill: 'red',
        left: pos[0] - c * u[0] + r,
        top: pos[1] - c * u[1] + r,
        fontFamily: 'Inconsolata',
      });
      editor.canvas.add(text);

      for (let i = 0; i < numberOfSeats; ++i) {
        const seat = new fabric.Circle({
          fill: jsonData.groups[key].sectionColor,
          top: pos[1],
          left: pos[0],
          radius: r,
          hasControls: false,
          hasBorders: false,
          hasRotatingPoint: false,
          originX: 'center',
          originY: 'center',
        });

        const text = new fabric.Text(`${startFrom + i}`, {
          fontSize: r,
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          left: pos[0] + r,
          top: pos[1] + r,
          fontFamily: 'Inconsolata',
        });

        seat.groupId = key;
        seat.isStart = false;
        seat.isEnd = false;

        if (i == 0) seat.isStart = true;
        if (i == numberOfSeats - 1) seat.isEnd = true;

        pos = [pos[0] + c * u[0], pos[1] + c * u[1]];
        groups[key].seats.push(seat);

        editor.canvas.add(seat);
        editor.canvas.add(text);
      }
    }

    editor.canvas.requestRenderAll();
  };

  const handleRowAngle = (e) => {
    const newAngle = Number(rowAngleInput.current.value);
    //
    editor.canvas.requestRenderAll();
    const newAngleRad = (newAngle * Math.PI) / 180;
    for (const gid of currSelectedGoup) {
      const group = groups[gid];
      if (!group) continue;

      group.directionUnitVector = [
        Math.cos(newAngleRad),
        Math.sin(newAngleRad),
      ];
      const startObj = group.seats[0];

      let i = 0;
      for (const seat of group.seats) {
        if (i != 0) group.group.removeWithUpdate(seat);
        i += 1;
      }

      group.seats = [startObj];
      const numOfSeats = group.numberOfSeats;
      group.numberOfSeats = 1;
      group.endX = group.startX;
      group.endY = group.startY;

      for (let i = 1; i < numOfSeats; ++i) {
        const seat = addSeatToRow(group, 1);
        if (!seat) continue;
        group.group.addWithUpdate(seat);
      }
    }

    if (currSelectedGoup.length > 1) {
      lastActiveSelectionPos = [
        editor.canvas.getActiveObject().left +
          editor.canvas.getActiveObject().width / 2,
        editor.canvas.getActiveObject().top +
          editor.canvas.getActiveObject().height / 2,
      ];
    } else {
      lastActiveSelectionPos = [
        editor.canvas.getActiveObject().left,
        editor.canvas.getActiveObject().top,
      ];
    }

    setRowAngle(newAngle);

    editor.canvas.renderAll();
  };

  const handleChangePrimColor = () => {
    editor.canvas.requestRenderAll();
    const newColor = primColorIn.current.input.value;
    for (const prim of currSelectedPrimitive) {
      prim.set('fill', newColor);
    }
    editor.canvas.renderAll();
  };

  const handePrimRotation = () => {
    editor.canvas.requestRenderAll();
    const newAngle = primRotIn.current.value;
    for (const prim of currSelectedPrimitive) {
      prim.set('angle', newAngle);
    }
    editor.canvas.renderAll();
  };

  const sectionOptions = sections.map((v) => ({
    value: v[0],
    label: v[0],
  }));

  return (
    <React.Fragment>
      {contextHolder}
      <div
        tabIndex={'0'}
        onKeyDown={(e) => {
          if (e.key == 'Delete') onDeleteRow();
        }}
      >
        <div
          className="text-center"
          style={{
            display: 'grid',
            gridTemplateColumns: '170px 1fr 170px',
          }}
        >
          <div style={{ paddingRight: '24px' }}>
            <h5
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Tools
            </h5>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button style={{ width: 150 }} onClick={onAddText}>
                Text
              </Button>
            </Space>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button style={{ width: 150 }} onClick={onAddRectangle}>
                Rectangle
              </Button>
            </Space>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button style={{ width: 150 }} onClick={onAddRow}>
                Row
              </Button>
            </Space>

            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button style={{ width: 150 }} onClick={onAddMultilineRow}>
                Multiline Row
              </Button>
            </Space>

            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 50,
              }}
            >
              <Button style={{ width: 150 }} onClick={onAutomaticRowLabeling}>
                Automatic Labels
              </Button>
            </Space>
            <h5
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              Sections
            </h5>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              <Input
                style={{ width: 150 }}
                type="text"
                placeholder="Name"
                onChange={onCategoryNameChange}
              />
            </Space>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <ColorPicker
                defaultFormat={'hex'}
                showText
                allowClear={true}
                style={{ width: 150 }}
                onChange={onCategoryColorChange}
              />
            </Space>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              <Button
                style={{ width: 150, backgroundColor: '#f58634' }}
                onClick={onAddCategory}
              >
                Add Section
              </Button>
            </Space>

            {/* <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              <Button
                style={{ width: 150, backgroundColor: '#f58634' }}
                onClick={() => loadDesign(jsonData)}
              >
                Edit
              </Button>
            </Space> */}
          </div>

          <div
            ref={canvasDivRef}
            style={{
              minHeight: '500px',
              maxHeight: '70vh',
              height: '70vh',
              width: '100%',
            }}
          >
            <FabricJSCanvas className="sample-canvas" onReady={onReady} />
          </div>
          <div style={{ paddingLeft: '24px' }}>
            <h5
              style={{
                fontWeight: 600,
                lineHeight: 1.4,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Properties
            </h5>

            {currSelectedGoup.length == 1 ? (
              <div>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Space
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <p>{getCategory() ? `Section: ${getCategory()}` : '-'}</p>
                  </Space>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Space
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <label style={{ display: 'block' }}>Row Name</label>
                    <Input
                      style={{ width: 150 }}
                      onChange={handleChangeRowLabel}
                      value={rowName}
                    />
                  </Space>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Space
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <label style={{ display: 'block' }}>
                      Number of Row Seats
                    </label>
                    <InputNumber
                      onChange={handleChangeNumberOfSeats}
                      value={getNumberOfSeatsInGroup()}
                      style={{ width: 150 }}
                    />
                  </Space>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Space
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <label style={{ display: 'block' }}>
                      Row Seats Spacing
                    </label>
                    <InputNumber
                      onChange={handleChangeSpacing}
                      value={getSpacingGroup()}
                      style={{ width: 150 }}
                    />
                  </Space>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 50,
                  }}
                >
                  <Space
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <label style={{ display: 'block' }}>
                      Start Seat Number
                    </label>
                    <InputNumber
                      onChange={handleChangeStartSeat}
                      value={startingSeat}
                      style={{ width: 150 }}
                    />
                  </Space>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Button
                    onClick={onAddSeatToSelectedRowFromStart}
                    style={{ width: 150 }}
                  >
                    Add Seat - Start
                  </Button>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 50,
                  }}
                >
                  <Button
                    onClick={onAddSeatToSelectedRowFromEnd}
                    style={{ width: 150 }}
                  >
                    Add Seat - End
                  </Button>
                </Space>
              </div>
            ) : (
              ''
            )}
            {currSelectedGoup.length ? (
              <div>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <InputNumber
                    placeholder="0"
                    style={{ width: 150 }}
                    ref={rowAngleInput}
                  />
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 50,
                  }}
                >
                  <Button onClick={handleRowAngle} style={{ width: 150 }}>
                    Rotate
                  </Button>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Button onClick={onDuplicateRow} style={{ width: 150 }}>
                    Duplicate
                  </Button>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Select
                    style={{ width: 150 }}
                    placeholder="Choose section"
                    onChange={onChangeSelectCategory}
                    options={sectionOptions}
                  />
                </Space>
              </div>
            ) : (
              ''
            )}
            {currSelectedPrimitive.length != 0 ? (
              <div>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Space
                    style={{ display: 'grid', gridTemplateColumns: '1fr' }}
                  >
                    <Space
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <label style={{ display: 'block' }}>Color</label>
                      <Input
                        style={{ width: 150 }}
                        type="color"
                        onChange={handleChangePrimColor}
                        ref={primColorIn}
                      />
                    </Space>
                  </Space>
                </Space>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Space
                    style={{ display: 'grid', gridTemplateColumns: '1fr' }}
                  >
                    <Space
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <label style={{ display: 'block' }}>Rotate</label>
                      <InputNumber
                        placeholder="0"
                        style={{ width: 150 }}
                        onChange={handePrimRotation}
                        ref={primRotIn}
                      />
                    </Space>
                  </Space>
                </Space>
              </div>
            ) : (
              ''
            )}
            {currSelectedGoup.length != 0 ||
            currSelectedPrimitive.length != 0 ? (
              <div>
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <DeleteButton style={{ width: 150 }} onClick={onDeleteRow}>
                    Delete
                  </DeleteButton>
                </Space>
              </div>
            ) : (
              'No data'
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default SeatDesigner;
