import React from "react";
import cn from "classnames";

export const Card = React.memo(({ className, name, surname, desc, color, onDelUser }) => {
  return (
    <div className="row">
      <div className="offset-m1 offset-l2 col s12 m10 l8">
        <div className={cn("card-item", "mt1", className)}>
          <span
            className={cn("circle", "center-align", "white-text", "lh3", color)}
          >
            {name[0].toUpperCase()}
          </span>
          <div className="text">
            <p>{name}</p>
            <p>{surname}</p>
            <p>{desc}</p>
          </div>
          <div className="ml-auto">
            <i className="material-icons">edit</i>
            <i className="material-icons" onClick={onDelUser}>delete</i>
          </div>
        </div>
      </div>
    </div>
  );
});
