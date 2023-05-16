import React from "react";
import {
  format,
  formatDistanceToNow,
  isWithinInterval,
  differenceInDays,
} from "date-fns";
import { tr } from "date-fns/locale";

const Task = ({ taskObj, onComplete }) => {
  // const { formatDistanceToNow } = require("date-fns");
  const formattedDistance = formatDistanceToNow(new Date(taskObj.deadline), {
    locale: tr,
  });
  const kalanZaman = formatDistanceToNow(
    new Date(taskObj.deadline).getTime() -
      10800000 +
      86400000 /* 3 saat fark sildim ve 1 gün ekledim  */,
    {
      locale: tr,
      addSuffix: true,
    }
  );

  const deadlineDate = new Date(taskObj.deadline); // taskObj.deadline'i tarih nesnesine dönüştür

  const kalangün = differenceInDays(deadlineDate, new Date());
  console.log("---------------------");
  console.log("Kalan Gün: ", kalangün);
  console.log("Kalan Zaman: ", kalanZaman);

  let spanStyle = {};
  if (format(new Date(), "yyyy-MM-dd") < taskObj.deadline) {
    spanStyle = { backgroundColor: "#d2d5fd" };
  }
  if (format(new Date(), "yyyy-MM-dd") > taskObj.deadline) {
    spanStyle = { backgroundColor: "#ffd9d4" };
  }
  if (kalangün < 3 && kalangün >= 0) {
    spanStyle = { backgroundColor: "#ffd9d4" };
  }

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className="text-xs pt-0.25">
        son teslim:{" "}
        <span className="py-1 px-2 inline-block " style={spanStyle}>
          {kalanZaman}
        </span>
      </div>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span
            className="inline-block py-1.5 px-3 text-sm	border-2 border-solid border-[#ccc] mr-1 mb-1.5 rounded-xl  "
            key={p}
          >
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
};

export default Task;
