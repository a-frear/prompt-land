import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import DiscoverList from "../DiscoverList/DiscoverList";

const Discover = () => {
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
    <div className="discover">
      <form className="discover-form">
        <label className="discover-label">Choose medium(s):</label>
        <MultiSelect
          className="discover-multiselect"
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select"}
          hasSelectAll={false}
        />
      </form>
      <section className="PromptFeed">
        <DiscoverList tags={selected} />
      </section>
    </div>
  );
};

export default Discover;
