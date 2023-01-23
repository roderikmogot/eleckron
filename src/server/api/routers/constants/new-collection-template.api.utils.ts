import crypto from "crypto";

const NEW_COLLECTION_TEMPLATE = (email: string) => {
  const UUID = crypto.randomUUID();
  return {
    name: "Test1",
    method: "GET",
    url: "",
    queryParams: JSON.stringify([
      {
        parameter: "",
        value: "",
      },
    ]),
    authBasic: JSON.stringify({
      username: "",
      password: "",
    }),
    authBearer: JSON.stringify({
      token: "",
    }),
    body: JSON.stringify({
      jsonContent: "",
    }),
    responses: JSON.stringify({
      output: "",
      status: "",
      size: "",
      time: "",
    }),
    uniqueId: UUID,
    userEmail: email,
  };
};

export default NEW_COLLECTION_TEMPLATE;
