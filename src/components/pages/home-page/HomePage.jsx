import { useEffect, useState } from 'react';
import fieldService from '../../../services/field/field.service';

import './HomePage.scss';

function Home() {
  const [field, setField] = useState([]);
  const [fieldTemplate, setFieldTemplate] = useState([]);
  const [currentMode, setCurrentMode] = useState({});
  const [selectedMode, setSellectedMode] = useState({});
  const [activeFields, setActiveFields] = useState([]);
  const [isShowFields, SetIsShowFields] = useState(false);

  const handleSelectMode = (event) => {
    setSellectedMode(event.target.value);
  };

  const handleMouseOver = (event) => {
    const { target } = event;
    const { name } = target;

    if (activeFields.includes(name)) {
      const index = activeFields.indexOf(name);
      activeFields.splice(index, 1);
      target.className = 'item';
      return;
    }
    target.className = 'item--active  item';
    const returnArray = activeFields.slice();
    returnArray.unshift(name);
    setActiveFields(returnArray);
  };

  const clickChangeMode = () => {
    SetIsShowFields(true);
    if (selectedMode === currentMode) return;
    setActiveFields([]);
    // forse rerender, Deleted highlighted items from previous mode.
    setFieldTemplate([]);
    setCurrentMode(selectedMode);
  };
  const parseField = () => {
    if (field[currentMode]) {
      const resultArr = [];
      const arrRow = [];
      const fullSize = field[currentMode].field;
      for (let columnItem = 1; columnItem <= fullSize; columnItem += 1) {
        arrRow.push(columnItem);
      }
      for (let rowItem = 1; rowItem <= fullSize; rowItem += 1) {
        resultArr.push({ [rowItem]: arrRow });
      }
      setFieldTemplate(resultArr);
    }
  };
  const getField = async () => {
    try {
      const response = await fieldService();
      setField(response);
      setCurrentMode(Object.keys(response)[0]);
    } catch (error) {
      console.error('Error request: ', error);
    }
  };

  useEffect(() => {
    parseField();
  }, [currentMode]);

  useEffect(() => {
    getField();
  }, []);

  const renderFieldTepmlate = fieldTemplate.map((row) => (
    <div className='row' key={Object.keys(row)[0]}>
      {Object.values(row)[0].map((item) => (
        <input
          type='button'
          key={item}
          onMouseOver={handleMouseOver}
          onFocus={handleMouseOver}
          onClick={handleMouseOver}
          className={`item `}
          value=''
          name={`${Object.keys(row)[0]} : ${item}`}
        />
      ))}
    </div>
  ));
  return (
    <main className='home'>
      <div className='home__setting-block'>
        <select defaultValue='DEFAULT' onChange={handleSelectMode}>
          {field ? (
            <>
              <option value='DEFAULT' disabled>
                Select mode
              </option>
              {Object.keys(field).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </>
          ) : (
            <option value='normalMode'>Loading</option>
          )}
        </select>
        {/* i can put button in new folder for reusable, but it is too small project */}
        <button type='button' onClick={clickChangeMode}>
          start
        </button>
      </div>
      <div className='home__output-block'>
        <div className='grid-block'>{fieldTemplate && isShowFields ? renderFieldTepmlate : <></>}</div>
        <div className='info-block'>
          {activeFields ? activeFields.map((item) => <div key={item}>row: column - {item}</div>) : <>nothig</>}
        </div>
      </div>
    </main>
  );
}

export default Home;
