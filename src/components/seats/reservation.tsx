import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { THEME } from "../utils/globals";
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
  category = "None";
  categoryColor = seatColor;
  label = -1;
  startSeatsFrom = 1;
}

let groups = {};
let categories = [["None", seatColor]];
const r = 7;
let firstTime = false;
let time = Math.floor(Date.now())

let canvas = null;
let jsonMap = null;
let globalZoom = 0;


const SeatReservation = () => {
  // const { editor, onReady } = useFabricJSEditor();
// const editor = null;
  const canvasDivRef = useRef(null);
  const reserveSelectForm = useRef(null);
  const propNameIn = useRef(null);
  const propValueIn = useRef(null);
  // const [canvas, setCanvas] = useState(null);

  const [currSelectedSeat, setCurrSelectedSeat] = useState([]);
  const [rerender,setRerender] = useState(0)

  window.addEventListener("resize", ()=>{
    if(canvasDivRef &&  canvasDivRef.current && canvas)
    {
      const width = canvasDivRef.current.clientWidth;
      const height = canvasDivRef.current.clientHeight;
      canvas.setWidth(width);
      canvas.setHeight(height);
    }
  })
  const handleMouseClick = (e) => {
    // e.preventDefault()
    // console.log("click",canvas)


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
      var vpt = canvas.viewportTransform;
      vpt[4] += e.clientX - canvas.lastPosX;
      vpt[5] += e.clientY - canvas.lastPosY;
      canvas.requestRenderAll();
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
    }
  }

  const loadFromJson = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const jsonDesign = JSON.parse(text);
      console.log(jsonDesign);
      loadDesign(jsonDesign);
    };
    if (e.target.files.length != 0) reader.readAsText(e.target.files[0]);
  };

  const loadDesign = (json) => {
    jsonMap = json;

    canvas.requestRenderAll()
    canvas.clear();
    canvas.setBackgroundColor(THEME.background);
    Object.keys(groups).forEach((key) => delete groups[key]);

    groups = {};
    categories = [...json.categories];

    for (let key in json.groups) {
      groups[key] = { ...json.groups[key] };
      let pos = [json.groups[key].startX, json.groups[key].startY];
      const u = [...json.groups[key].directionUnitVector];
      const numberOfSeats = json.groups[key].numberOfSeats;
      const c = 2 * r + json.groups[key].spacing / 2;
      const startFrom = json.groups[key].startSeatsFrom;
      groups[key].seats = json.groups[key].seats;

      // row label
      const text = new fabric.Text(`${json.groups[key].label}`, {
        fontSize: r * 2,
        textAlign: "center",
        originX: "center",
        originY: "center",
        fill: "red",
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
          objectCaching:false
      });
      canvas.add(text);
      // draw row
      for (let i = 0; i < numberOfSeats; ++i) {
        const seat = new fabric.Circle({
          fill: json.groups[key].categoryColor,
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
          selectable:true,
          objectCaching:false
        });

        const text = new fabric.Text(`${startFrom + i}`, {
          fontSize: r,
          textAlign: "center",
          originX: "center",
          originY: "center",
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
          objectCaching:false
        });

        seat.groupId = key;
        seat.isStart = false;
        seat.isEnd = false;
        seat.reserved = json.groups[key].seats[i][0][1]; // TODO: maybe json will have if seat is reserved or not
        if(seat.reserved) seat.set("opacity","0.2")
        seat.seatId = i + startFrom;
        seat.rowId = json.groups[key].label;
        seat.props = json.groups[key].seats[i];
        seat.seatIndx = i;

        if (i == 0) seat.isStart = true;
        if (i == numberOfSeats - 1) seat.isEnd = true;

        pos = [pos[0] + c * u[0], pos[1] + c * u[1]];
        groups[key].seats.push(seat);

        canvas.add(seat);
        // editor.canvas.bringToFront(seat)
        canvas.add(text);
      }
    }

    for (let primitive of json.primitives) {
      // editor.canvas.loadFromJSON(primitive);
      // fabric.util.
      // console.log(primitive)
      // console.log(JSON.parse(primitive))
      if (primitive.type == "i-text")
        canvas.add(
          new fabric.Text(primitive.text, {
            ...primitive,
            selectable: false,
            evented: false,
            objectCaching:false
          })
        );
      else if (primitive.type == "rect") {
        const rect = new fabric.Rect({
          ...primitive,
          selectable: false,
          evented: false,
          objectCaching:false
        });
        canvas.add(rect);
        canvas.sendToBack(rect);
      }
    }

    canvas.renderAll();
  };

  /*
  if ( editor && !firstTime) {

    firstTime = true;
    console.log("ff")
    const width = canvasDivRef.current.clientWidth;
    const height = canvasDivRef.current.clientHeight;
    editor.canvas.setWidth(width);
    editor.canvas.setHeight(height);
    editor.canvas.setBackgroundColor("#ecf0f1");
    editor.canvas.selectionKey = "shiftKey"
    editor.canvas.selection = true;

    editor.canvas.off("mouse:down");
    editor.canvas.on("mouse:down", (e) => handleMouseClick(e.e));

    editor.canvas.off("mouse:move");
    editor.canvas.on("mouse:move", (e) => hanldeMouseOver(e.e));

    editor.canvas.remove("mouse:wheel");
    editor.canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = editor.canvas.getZoom();
      if (delta < 0) zoom += 0.1;
      else zoom -= 0.1;

      if (zoom > 20) zoom = 20;
      if (zoom < 0.05) zoom = 0.05;

      editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
      // if(Math.floor(Date.now()) - time > 3)
      // {
        editor.canvas.renderAll();
        // time = Math.floor(Date.now())
      // }
    });

    editor.canvas.remove("mouse:up");
    editor.canvas.on("mouse:up", function (opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      editor.canvas.setViewportTransform(editor.canvas.viewportTransform);
      editor.canvas.isDragging = false;
      editor.canvas.selection = true;
    });

    // editor.canvas.selection = false;

    editor.canvas.off("selection:created");
    editor.canvas.on("selection:created", (e) => handleSeatSelection(e));

    editor.canvas.off("selection:updated");
    editor.canvas.on("selection:updated", (e) => handleSeatSelection(e));

    editor.canvas.preserveObjectStacking = true;
    editor.canvas.renderOnAddRemove = false;
    editor.canvas.skipTargetFind = true;

    // function animate() {
    //   console.log("aniu")
    //   // Update canvas and objects here
    //   editor.canvas.requestRenderAll();

    //   // Request the next animation frame
    //   fabric.util.requestAnimFrame(animate);
    // }

    // animate()
  }
*/
useEffect(() => {
  if(canvas)
  {
    const width = canvasDivRef.current.clientWidth;
    const height = canvasDivRef.current.clientHeight;
    canvas.setWidth(width);
    canvas.setHeight(height);
  }

  if(canvas) return;
  canvas = initCanvas();
  const width = canvasDivRef.current.clientWidth;
  const height = canvasDivRef.current.clientHeight;
  canvas.setWidth(width);
  canvas.setHeight(height);
  fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.statefullCache = false;
    fabric.Object.prototype.noScaleCache = true;
    // fabric.Object.prototype.needsItsOwnCache = false;

  globalZoom = canvas.getZoom()
  console.log("canvas",canvas)

    canvas.setBackgroundColor(THEME.background);

    canvas.selectionKey = "shiftKey"
    canvas.selection = true;


    canvas.off("mouse:down");
    canvas.on("mouse:down", (e) => handleMouseClick(e.e));

    canvas.off("mouse:move");
    canvas.on("mouse:move", (e) => hanldeMouseOver(e.e));

    canvas.remove("mouse:wheel");
    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      // var zoom = canvas.getZoom();
      // let zoom = globalZoom;
      if (delta < 0) globalZoom += 0.05;
      else globalZoom -= 0.05;

      if (globalZoom > 20) globalZoom = 20;
      if (globalZoom < 0.05) globalZoom = 0.05;

      opt.e.preventDefault();
      opt.e.stopPropagation();
      // if(Math.floor(Date.now()) - time > 4)
      // {
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, globalZoom);
        canvas.renderAll();
        time = Math.floor(Date.now())
      // }
    });

    canvas.remove("mouse:up");
    canvas.on("mouse:up", function (opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      canvas.setViewportTransform(canvas.viewportTransform);
      canvas.isDragging = false;
      canvas.selection = true;
    });

    // editor.canvas.selection = false;

    canvas.off("selection:created");
    canvas.on("selection:created", (e) => handleSeatSelection(e));

    canvas.off("selection:updated");
    canvas.on("selection:updated", (e) => handleSeatSelection(e));

    // canvas.on("")

    canvas.preserveObjectStacking = true;
    canvas.renderOnAddRemove = false;
    // canvas.skipTargetFind = true;

    // setRerender(prev => !prev)

}, []);

const initCanvas = () => (
  new fabric.Canvas('canvas', {
    // height: 800,
    // width: 800,
    // backgroundColor: 'pink'
  })
);


  const handleSeatSelection = (e) => {
    // return;
    let seats = [];

    // let seatsToSelect = [];
    if(e.e.shiftKey && e.selected[0] && e.selected[0].group)
    {
      for(let selected of e.selected[0].group._objects)
      {
        seats.push({
          rowId: selected.rowId,
          seatId: selected.seatId,
          reserved: selected.reserved,
          obj: selected,
        });
        // seatsToSelect.push(obj.obj);
      }

    }else
    {

      for (let selected of e.selected) {
        console.log( selected.seatId)
        if (selected.seatId) {
          seats.push({
            rowId: selected.rowId,
            seatId: selected.seatId,
            reserved: selected.reserved,
            obj: selected,
          });
          // seatsToSelect.push(selected);
        }
      }
    }
    // editor.canvas.discardActiveObject();
    // const sel = new fabric.ActiveSelection(seatsToSelect, {
    //   canvas: editor.canvas,
    //   hasControls: false,
    //   padding: 1,
    //   borderColor: "black",
    // });
    canvas.getActiveObject().set("lockScalingX", true);
    canvas.getActiveObject().set("lockScalingY", true);
    canvas.getActiveObject().set("lockMovementX", true);
    canvas.getActiveObject().set("lockMovementY", true);
    canvas.getActiveObject().set("lockRotation", true);
    canvas.getActiveObject().set("lockScalingFlip", true);
    canvas.getActiveObject().set("lockSkewingX", true);
    canvas.getActiveObject().set("lockSkewingY", true);
    canvas.getActiveObject().set("lockUniScaling", true);
    canvas.getActiveObject().set("hasControls", false);
    if(seats.length > 1 ) canvas.getActiveObject().set("hasBorders",false);

    // new fabric.ActiveSelection(seats,{hasBorders})

    setCurrSelectedSeat([...seats]);

    // editor.canvas._setActiveObject(sel);
    // editor.canvas.requestRenderAll();
  };

  const handleToggleReserve = () => {
    if (currSelectedSeat.length == 1) {
      currSelectedSeat[0].obj.reserved = !currSelectedSeat[0].obj.reserved;
      jsonMap.groups[currSelectedSeat[0].obj.groupId].seats[currSelectedSeat[0].obj.seatIndx][0][1] = currSelectedSeat[0].obj.reserved;
      setCurrSelectedSeat([
        {
          ...currSelectedSeat[0],
          reserved: currSelectedSeat[0].obj.reserved,
        },
      ]);
      Swal.fire({
        title: `Seat ${
          currSelectedSeat[0].obj.reserved ? "Reservation" : "Un-Reservation"
        } Is Successfull`,
        text: `${
          currSelectedSeat[0].obj.reserved ? "Reserved" : "Un-Reserved"
        } Seat ${currSelectedSeat[0].seatId} In Row ${
          currSelectedSeat[0].rowId
        }`,
        icon: "success",
      });

      if (currSelectedSeat[0].obj.reserved) {
        currSelectedSeat[0].obj.set("opacity", "0.2");
      } else {
        currSelectedSeat[0].obj.set("opacity", "1");
      }
    }
    canvas.renderAll()
  };

  const handleMultiSeatReserve = () => {
    const reserve = Number(reserveSelectForm.current.value);
    let newSeats = [];
    for (let seat of currSelectedSeat) {
      seat.obj.reserved = reserve;
      jsonMap.groups[seat.obj.groupId].seats[seat.obj.seatIndx][0][1] = reserve;
      if (reserve) seat.obj.set("opacity", "0.2");
      else seat.obj.set("opacity", "1");
      newSeats.push(seat);
    }

    Swal.fire({
      title: `Seat ${
        reserve ? "Reservation" : "Un-Reservation"
      } Is Successfull`,

      icon: "success",
    });
    setCurrSelectedSeat([...newSeats]);
    canvas.renderAll()

  };

  const handleAddProp = () =>
  {
    const propName = propNameIn.current.value;
    const propValue = propValueIn.current.value;
    console.log(propName,propValue)
    if(propName != "" && propValue != "")
    {
      let newSeats = [];
      for(let seat of currSelectedSeat)
      {
        seat.obj.props.push(  [propName, propValue]);
        newSeats.push(seat);
        // jsonMap.groups[seat.obj.groupId].seats[seat.obj.seatIndx].push( [propName, propValue])
      }


    Swal.fire({
      title: `Adding Property To Selected Seats Successfully`,
      text: `Added Property ${propName} With Value ${propValue} To Selected Seats`,
      icon: "success",
    });

      setCurrSelectedSeat(newSeats)
    }
  }

  const saveJson = () =>
  {
    const myData = jsonMap;
    const fileName = "seat_map";
    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  return (
    <div className="row">
      <div className="col-2">
      <div className="text-center p-4">
        <h1>Tools</h1>
        </div>
        <div className="text-center p-4">
          <input
            type="file"
            className="form-control"
            onChange={loadFromJson}
          ></input>
          load file
        </div>

        <div className="text-center p-4">
          <button

            className="btn btn-danger"
            onClick={saveJson}
          >
            Save Map
          </button>
        </div>
      </div>
      <div className="col-8" ref={canvasDivRef} style={{ minHeight: "100vh" }}>
        {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
        <canvas id="canvas"></canvas>
      </div>
      <div className="col-2" style={{ overflowY: "scroll", height: "100vh" }}>
        {currSelectedSeat.length == 0 ? (
          <div className="text-center p-3">No Seat Is Selected </div>
        ) :
        currSelectedSeat.length == 1 ? (
          <div className="row text-center" style={{ padding: "20px" }}>
            <p>
              Selected Seat{" "}
              <label style={{ color: THEME.secondary }}>
                {currSelectedSeat[0].seatId}
              </label>{" "}
              in Row
              <label style={{ color: THEME.secondary }}>
                {" "}
                {currSelectedSeat[0].rowId}
              </label>
              <br></br>
              is{" "}
              <label style={{ color: THEME.secondary }}>
                {currSelectedSeat[0].reserved ? "" : "NOT"} Reserved{" "}
              </label>
            </p>
            <button
              onClick={handleToggleReserve}
              className="btn btn-light p-3"
              style={{backgroundColor:THEME.primary}}
            >
              {currSelectedSeat[0].reserved ? "Un-Reserve" : "Reserve"}
            </button>

            <div className="row text-center">
              <p>Custom Props</p>
              {currSelectedSeat[0].obj.props ? currSelectedSeat[0].obj.props.map((prop,i) => (
               i == 0 ? ( "" ) :
                     <p key={i}> <b>{prop[0]} :</b> {prop[1]}<br></br></p>
                    )) : ""}
              </div>
          </div>
        ) : (
          <div className="row text-center" style={{ padding: "20px" }}>
            <div style={{ padding: "20px" }}>
              <select className="form-control" ref={reserveSelectForm}>
                <option value={1}>Reserve</option>
                <option value={0}>Un-Reserve</option>
              </select>
            </div>
            <div style={{ padding: "20px" }}>
              <button
                className="btn btn-light p-3"
                style={{backgroundColor:THEME.primary}}
                onClick={handleMultiSeatReserve}
              >
                Confirm
              </button>
            </div>
          </div>
        )
        }
        {  currSelectedSeat.length >= 1 ? (<div>
<div className="text-center" style={{ padding: "20px" }}>
              <input className="form-control" placeholder="prop name" type="text" ref={propNameIn} style={{ margin: "20px" }}>
              </input>

              <input className="form-control" placeholder="prop value" type="text" ref={propValueIn} style={{ margin: "20px" }}>
              </input>

              <button
                className="btn btn-light p-3"
                style={{backgroundColor:THEME.primary}}
                onClick={handleAddProp}
              >
                Add Prop
              </button>
            </div>

        </div>) : ""
        }
      </div>
    </div>
  );
};

export default SeatReservation;
