import React from "react";
import { useParams } from "react-router-dom";

type MatchParams = {
  touristRouteId: string,
  other: string
}

export const DetailPage: React.FC = (
  props
) => {
  const params = useParams<MatchParams>();
  return <h1>Detail Page: {params.touristRouteId} {params.other}</h1>;
};
