import { Form, useForm } from "react-hook-form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const HookedForm = ({ id }) => {
  const { register, handleSubmit } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const { mutate, isSuccess } = api.client.create.useMutation();
  const { data, refetch } = api.client.clientDetail.useQuery({ id });

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  const onSubmit = ({ name, age }) => {
    mutate({ id, name, age: +age });
  };

  if (!data) return "Loading...";

  return (
    <div className="flex flex-col">
      <h2 className="mb-4">Client ID: {id}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name">Client name</label>
          <Input
            {...register("name", { disabled: !isEditMode })}
            defaultValue={data?.name}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age">Client age</label>
          <Input
            {...register("age", { disabled: !isEditMode })}
            defaultValue={data?.age}
          />
        </div>
        <Button
          type="submit"
          className={cn(isEditMode && "bg-green-600 hover:bg-green-500")}
          disabled={!isEditMode}
        >
          Submit
        </Button>
        <Button
          type="button"
          className={cn(
            "bg-blue-600 hover:bg-blue-500",
            !isEditMode && "bg-gray-600 hover:bg-blue-500",
          )}
          onClick={() => setIsEditMode((prev) => !prev)}
        >
          Edit
        </Button>
      </form>
    </div>
  );
};
