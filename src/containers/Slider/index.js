import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const currentIndexRef = useRef(index);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(() => {
      if (byDateDesc && byDateDesc.length > 0) {
        const nextIndex = (currentIndexRef.current + 1) % byDateDesc.length;
        setIndex(nextIndex);
        currentIndexRef.current = nextIndex;
      }
    }, 5000);
  };
  useEffect(() => {
    nextCard();
  })
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (

        <div
          key={`divSlide-${event.title}`}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" key={`imgSlide-${event.title}`} />
          <div className="SlideCard__descriptionContainer" key={`slideContainer-${event.title}`}>
            <div className="SlideCard__description" key={`sldieDescription-${event.title}`}>
              <h3 key={`slideTitle-${event.title}`} >{event.title}</h3>
              <p key={`slideText-${event.title}`}>{event.description}</p>
              <div key={`sideDate-${event.title}`}>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>

      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`inputPagination-${event.title}`}
              type="radio"
              name="radio-button"
              checked={currentIndexRef.current === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
