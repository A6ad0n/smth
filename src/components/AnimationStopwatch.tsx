import React, { useEffect, useState } from "react";

interface AnimationProps {
  children: React.ReactNode;
  isRemoving: boolean;
  isAdded: boolean;
};

export default function AnimationComponent(props : AnimationProps) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (props.isAdded) {
    setAnimationClass("transition animate-slide-in");
    }
    if (props.isRemoving) {
    setAnimationClass("transition animate-slide-out");
    }
  }, [props.isAdded, props.isRemoving]);

  return (
    <div className={`opacity-0 ${animationClass}`}>
      {props.children}
    </div>
  );
};
