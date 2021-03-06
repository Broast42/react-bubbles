import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [add, setAdd] = useState({});

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        //console.log(res);
        updateColors(
          colors.map(x => {
            if (x.id === colorToEdit.id){
              return {
                ...x,
                color: colorToEdit.color,
                code: colorToEdit.code
              }
                  
            }
            return x;
          })
        )
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        console.log(res);
        updateColors(
          colors.filter(x => x.id !== res.data)
        );
      })
      .catch(err => {
        console.log(err);
      })

  };

  const handleName = e => {
    setAdd({
      ...add,
      [e.target.name]: e.target.value
    })
  };

  const handleHex = e => {
    setAdd({
      ...add,
      code: { [e.target.name]: e.target.value }
    })
  };

  //console.log(add);

  const addColor = e => {
    axiosWithAuth()
      .post('/colors', add)
      .then(res => {
        console.log("res",res);
      })
      .catch(err => {
        console.log(err);
      })

    
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>Add a color</legend>
          <label>
            color name:
            <input
              type="text"
              name="color"
              onChange={handleName}
            />
          </label>
          <label>
            hex code:
            <input
              type="text"
              name="hex"
              onChange={handleHex}
              defaultValue="#"
            />
          </label>
          <div className="button-row">
            <button type="submit">Add Color</button>
          </div>
      </form>
    </div>
  );
};

export default ColorList;
