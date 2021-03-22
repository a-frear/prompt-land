import React, { useContext, useState } from "react";
import MultiSelect from "react-multi-select-component";
import { useAuth0 } from "@auth0/auth0-react";
import API_BASE_URL from "../config";
import PromptLandContext from "../PromptLandContext";
import { useHistory } from "react-router-dom";

const NewPrompt = () => {
  const [selected, setSelected] = useState([]);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [prompts, setPrompts] = useState([]);
  useContext(PromptLandContext);

  const options = [
    { label: "Whatever", value: "1" },
    { label: "Free Writing", value: "2" },
    { label: "Fiction", value: "3" },
    { label: "Photography", value: "4" },
    { label: "Comedy writing", value: "5" },
    { label: "Screenwriting", value: "6" },
    { label: "Poetry", value: "7" },
    { label: "Playwriting", value: "8" },
    { label: "Performance", value: "9" },
    { label: "Painting", value: "10" },
    { label: "Sculpture", value: "11" },
    { label: "Collage", value: "12" },
    { label: "Fabric Arts", value: "13" },
    { label: "Video", value: "14" },
    { label: "Songwriting", value: "15" },
    { label: "Music", value: "16" },
  ];

  const tagsArray = [];

  const history = useHistory();

  selected.map((tag) => {
    tagsArray.push(tag.value);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    function goHome() {
      history.go("/");
    }
    const token = await getAccessTokenSilently();
    const newPrompt = {
      username: user.nickname,
      prompt: e.target["new-prompt-textarea"].value,
      modified: new Date(),
      tag_id: tagsArray,
    };
    e.target["new-prompt-textarea"].value = "";
    fetch(`https://shielded-inlet-60576.herokuapp.com/api/prompts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPrompt),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((prompt) => {
        setPrompts([...prompts, prompt]);
      })
      .then(goHome)
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    isAuthenticated && (
      <div className="new-prompt">
        <form className="new-prompt-form" onSubmit={(e) => handleSubmit(e)}>
          <label className="new-prompt-label">Prompt:</label>
          <h4 className="char-limit">200 character limit</h4>
          <h3 className="prompting-as">Prompting as {user.nickname}</h3>
          <textarea
            type="text"
            id="new-prompt-textarea"
            name="new-prompt-textarea"
            maxLength="200"
            required
          ></textarea>
          <label className="new-prompt-label">Tags:</label>
          <MultiSelect
            className="multiselect"
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
    )
  );
};

export default NewPrompt;
