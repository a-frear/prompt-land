import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";

const NewPrompt = () => {
  const [selected, setSelected] = useState([]);

  const options = [
    { label: "Whatever", value: "1" },
    { label: "Free Writing", value: "2" },
    { label: "Fiction", value: "3" },
    { label: "Poetry", value: "4" },
    { label: "Screenwriting", value: "5" },
    { label: "Playwriting", value: "6" },
    { label: "Performance", value: "7" },
    { label: "Photography", value: "8" },
    { label: "Painting", value: "9" },
    { label: "Sculpture", value: "10" },
    { label: "Collage", value: "11" },
    { label: "Fabric Arts", value: "12" },
    { label: "Video", value: "13" },
    { label: "Ceramics", value: "14" },
    { label: "Songwriting", value: "15" },
    { label: "Music", value: "16" },
  ];

  return (
    <div className="new-prompt">
      <form className="new-prompt-form">
        <label className="new-prompt-label">Prompt:</label>
        <h4 className="char-limit">200 character limit</h4>
        <textarea
          type="text"
          id="new-prompt-textarea"
          name="new-prompt"
          maxlength="200"
          required
        ></textarea>
        <label className="new-prompt-label">Tags:</label>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select"}
          hasSelectAll={false}
        />
        <div>
          <button className="new-prompt-submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewPrompt;
