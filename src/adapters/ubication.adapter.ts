import { Ubication, UbicationResponse } from "@/models";

export const createAdaptedUbication = (
  ubication: UbicationResponse
): Ubication => {
  const adaptedUbication: Ubication = {
    id: ubication.id,
    name: ubication.name,
  };

  return adaptedUbication;
};
