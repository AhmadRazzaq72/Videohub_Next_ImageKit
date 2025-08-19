"use client";
import React, { forwardRef } from "react";
import { IKVideo } from "imagekitio-next";

// Infer props from IKVideo
type IKVideoProps = React.ComponentProps<typeof IKVideo>;

// Combine with standard video HTML attributes
type VideoProps = IKVideoProps & React.VideoHTMLAttributes<HTMLVideoElement>;

// Wrapper that forwards ref to IKVideo using innerRef
const IKVideoWithRef = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  // props cast as any is safe here because IKVideo type doesn't include innerRef
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <IKVideo {...(props as any)} innerRef={ref} />;
});

IKVideoWithRef.displayName = "IKVideoWithRef";
export default IKVideoWithRef;
