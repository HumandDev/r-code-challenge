import React from "react";
import { useParams } from "react-router-dom";
import { editCharacter, getCharacter } from "../services/character";
import { useQuery } from "@tanstack/react-query";
import locations from "../utils/locations.json";
import { CircularProgress } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "Unknown",
}

type Inputs = {
  name: string;
  status: Status;
  image: string;
  species: string;
  location: string;
};

function EditCharacter() {
  let { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: character, isLoading: loading } = useQuery({
    queryKey: ["character"],
    queryFn: async () => {
      const { data } = await getCharacter(+id!);
      return data;
    },
  });

  if (loading) {
    return <CircularProgress className="mt-20" />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    const location = locations.find(
      (location) => location.id === +formData.location
    );
    const body = {
      name: formData.name,
      status: formData.status,
      image: formData.image,
      species: formData.species,
      location: {
        name: location!.name,
        url: location!.url,
      },
    };
    await editCharacter(body, +id!);
    navigate(`/${id}`, { replace: true });
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center bg-slate-600 p-4">
      <div className="flex flex-col gap-2 min-w-[600px]">
        {character && (
          <>
            <div className="w-full flex flex-row items-center justify-center">
              <img
                src={character.image}
                alt={character.name}
                className="rounded-full border-4 border-slate-500 w-48 h-48"
              />
            </div>
            <form
              className="p-6 border-4 border-slate-700 rounded-xl flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="w-full flex flex-col text-slate-400 font-bold">
                Name:
                <input
                  {...register("name", { required: true, maxLength: 40 })}
                  defaultValue={character.name}
                  className={`${
                    errors.name ? "border border-red-600" : ""
                  } font-bold font-sans text-3xl text-slate-100 mb-4  bg-slate-800 leading-tight focus:outline-none focus:shadow-outline p-2 rounded`}
                />
              </label>
              <label className="w-full flex flex-col text-slate-400 font-bold">
                Image URL:
                <input
                  {...register("image", { required: true, maxLength: 150 })}
                  defaultValue={character.image}
                  className={`${
                    errors.image ? "border border-red-600" : ""
                  } font-bold font-sans text-sm text-slate-300 mb-4 bg-slate-800 leading-tight focus:outline-none focus:shadow-outline p-2 rounded`}
                />
              </label>
              <label className="w-full flex flex-col text-slate-400 font-bold">
                Species:
                <input
                  {...register("species", { required: true, maxLength: 40 })}
                  defaultValue={character.species}
                  className={`${
                    errors.image ? "border border-red-600" : ""
                  } font-bold font-sans text-sm text-slate-300 mb-4 bg-slate-800 leading-tight focus:outline-none focus:shadow-outline p-2 rounded`}
                />
              </label>
              <label className="w-full flex flex-col text-slate-400 font-bold">
                Location:
                <select
                  {...register("location", { required: true })}
                  defaultValue={character.location.name}
                  className="font-bold font-sans text-sm text-slate-300 mb-4 bg-slate-800 leading-tight focus:outline-none focus:shadow-outline p-2 rounded cursor-pointer"
                >
                  {locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="w-full flex flex-col text-slate-400 font-bold">
                Status:
                <select
                  {...register("status", { required: true })}
                  defaultValue={character.status}
                  className="font-bold font-sans text-sm text-slate-300 mb-4 bg-slate-800 leading-tight focus:outline-none focus:shadow-outline p-2 rounded cursor-pointer"
                >
                  <option value="Alive">Alive</option>
                  <option value="Dead">Dead</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>
              <button
                className="py-2 px-6 bg-blue-900 text-slate-300 rounded-lg self-end hover:bg-blue-800 w-full"
                type="submit"
              >
                Save changes!
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditCharacter;
