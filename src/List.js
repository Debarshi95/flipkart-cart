import React from "react";
const DATA = [
  { id: 1, name: "Some text 1" },
  { id: 2, name: "Some text 2" },
  { id: 3, name: "Some text 3" },
  { id: 4, name: "Some text 4" },
  { id: 5, name: "Some text 5" },
];
function List() {
  const [selectedObj, setSelectedObj] = React.useState({});

  const handleCheck = (data) => {
    if (selectedObj[data.id]) {
      let uncheckedObj = { ...selectedObj };
      delete uncheckedObj[data.id];
      setSelectedObj({ ...uncheckedObj });
    } else {
      setSelectedObj((prev) => ({
        ...prev,
        [data.id]: data.name,
      }));
    }
  };

  const checkAll = () => {
    if (DATA.length === Object.keys(selectedObj).length) {
      setSelectedObj({});
    } else {
      const allChecked = {};
      DATA.forEach((element) => {
        allChecked[element.id] = [element.name];
      });
      setSelectedObj(allChecked);
    }
  };

  const handleBgColor = (e, item) => {
    setSelectedObj((prev) => ({
      ...prev,
      [item.id]: { bgColor: e.target.value },
    }));
  };
  console.log(selectedObj);
  return (
    <div>
      <h4>
        Top Check
        <input
          type="checkbox"
          checked={DATA.length === Object.keys(selectedObj).length}
          onChange={checkAll}
        />
      </h4>
      {DATA.map((data) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "4px solid green",
            padding: "1rem",
            margin: "1rem",
            backgroundColor: `${selectedObj[data.id]?.bgColor}`,
          }}
          key={data.id}
        >
          <input
            type="checkbox"
            onChange={() => handleCheck(data)}
            checked={Boolean(selectedObj[data.id])}
          />
          <h4>{data.name}</h4>
          <select
            onChange={(e) => handleBgColor(e, data)}
            value={selectedObj[data.id]?.bgColor}
          >
            <option value="">Select a color</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default List;
