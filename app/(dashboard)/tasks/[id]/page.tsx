import React from "react";

type ParamsProp = {
  params: {
    id: string;
  };
};

const Page: React.FC<ParamsProp> = ({ params }) => {
  return <h1>{params.id}</h1>;
};

export default Page;
