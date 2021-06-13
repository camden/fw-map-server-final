import React from "react";
import { flatten } from "ramda";
import ImageMapper from "react-img-mapper";

export const mapImg =
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bf3911d6-d13c-4376-840d-3b81fdad903c/Vallonde_with_Hex_Numbers_v1.4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210612%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210612T010733Z&X-Amz-Expires=86400&X-Amz-Signature=1047704dd63ad4412428997a98161a06fe64c4cb7ae23bcdb7efbaead609695d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Vallonde_with_Hex_Numbers_v1.4.jpg%22";

const getAreas = () => {
  const hexes = [];

  const hexH = 73.87;
  const hexW = 64;

  for (let row = -1; row < 28; row++) {
    for (let col = 0; col < 32; col++) {
      let xOffset = 0;
      let yOffset = 0;

      xOffset = hexW * col;

      if (col % 2 === 0) {
        yOffset = hexH * row;
      } else {
        yOffset = hexH * row + hexH / 2;
      }

      const name =
        String(col + 1).padStart(2, "0") + String(row + 2).padStart(2, "0");

      const hex = {
        name,
        shape: "poly",
        coords: flatten(
          [
            [43, 74],
            [84, 74],
            [106, 112],
            [86, 148],
            [43, 148],
            [21, 112]
          ].map((arr) => [arr[0] + xOffset, arr[1] + yOffset])
        ),
        fillColor: "#fff5",
        strokeColor: "#0004",
        lineWidth: 10
        // preFillColor: "#fff1"
      };
      hexes.push(hex);
    }
  }

  return hexes;
};

const clickHandler = async (area, index, event) => {
  console.log(area);
  const res = await (await fetch(`/api/notionPage/${area.name}`)).json();
  console.log("got response: ", res);
  const pageUrl = `https://notion.so/camdenb/${res.id.replace(/-/g, "")}`;
  window.open(pageUrl, "_blank");
  console.log(pageUrl);
};

const Mapper = (props) => {
  return (
    <ImageMapper
      src={mapImg}
      responsive={false}
      disabled={false}
      imgWidth={2048}
      onClick={clickHandler}
      map={{
        name: "fw-map",
        areas: getAreas()
      }}
    />
  );
};

export default Mapper;
