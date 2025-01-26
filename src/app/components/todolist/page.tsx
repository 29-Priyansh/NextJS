import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";

export default function Todolist() {
  const inputRef = useRef(null);
  const [display, setDisplay] = useState("all");
  const [todolist, setTodolist] = useState([
    { id: "1", title: "hello", isDone: false },
    { id: "2", title: "world", isDone: true },
    { id: "3", title: "hello world", isDone: false },
  ]);

  const addTask = async (event) => {
    event.preventDefault();
    const inputEle = inputRef.current;
    const inputtxt = inputEle.value;

    //logic to add task without api
    setTodolist(() => [
      ...todolist,
      { id: new Date().getTime().toString(), title: inputtxt, isDone: false },
    ]);

    //logic to call api
    // if (inputtxt === "") return;
    // const response = await fetch(`http://localhost:3001/tasks`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: new Date().getTime().toString(),
    //     title: inputtxt,
    //     isDone: false,
    //   }),
    // });
    // loader();
    inputEle.value = "";
  };

  const loader = async () => {
    //logic to call api
    // const response = await fetch("http://localhost:3001/tasks");
    // const json = await response.json();
    // console.log(json);
    // setTodolist(() => json);
  };

  const updateTask = async (todoItem) => {
    
    //logic to add task without api
    const index = todolist.findIndex((item) => item.id === todoItem.id);
    setTodolist(() => [
      ...todolist.slice(0, index),
      { ...todoItem, isDone: !todoItem.isDone },
      ...todolist.slice(index + 1),
    ]);
    console.log(index);

    //logic to call api
    // const response = await fetch(`http://localhost:3001/tasks/${todoItem.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({ ...todoItem, isDone: !todoItem.isDone }),
    // });
    // if (response.ok) {
    //   console.log("Task updated successfully");
    //   loader();
    // }
  };

  const deleteTask = async (id) => {
    
    //logic to add task without api
    console.log(id);
    const index = todolist.findIndex((item) => item.id === id);
    console.log(index);
    setTodolist(() => [
      ...todolist.slice(0, index),
      ...todolist.slice(index + 1),
    ]);

    //logic to call api
    // try {
    //   const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    //     method: "DELETE",
    //   });

    //   if (response.ok) {
    //     console.log("Task deleted successfully");
    //     loader();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    loader();
  }, []);

  const myTemplate = (todoItem) => {
    return (
      <>
        <div className="flex gap-2 justify-between">
          <p
            style={
              todolist && todoItem.isDone
                ? { textDecoration: "line-through" }
                : {}
            }
          >
            {todoItem.title}
          </p>
          <div className="flex gap-5">
            <Button variant="outline" onClick={() => updateTask(todoItem)}>
              Done
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                deleteTask(todoItem.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen m-10">
        <h1>Todo List</h1>
        <form action="" onSubmit={() => addTask(event)}>
          <div className="space-y-2">
            <Label htmlFor="input" className="sr-only">
              Input with button
            </Label>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                placeholder="enter task"
                type="text"
                ref={inputRef}
              />
              <Button>Send</Button>
            </div>
          </div>
        </form>
        <div className="flex flex-col w-full gap-2 m-10">
          {todolist.map((todoItem) => {
            console.log(todoItem);
            switch (display) {
              case "all":
                return <div key={todoItem.id}>{myTemplate(todoItem)}</div>;
              case "pending":
                return todoItem.isDone ? null : (
                  <div key={todoItem.id}>{myTemplate(todoItem)}</div>
                );
              case "completed":
                return todoItem.isDone ? (
                  <div key={todoItem.id}>{myTemplate(todoItem)}</div>
                ) : null;
            }
            return <div key={todoItem.id}>{myTemplate(todoItem)}</div>;
          })}
        </div>

        <div className="flex w-full absolute bottom-0">
          <Button
            className="flex-1"
            onClick={() => setDisplay("all")}
            variant={display === "all" ? "" : "secondary"}
          >
            All
          </Button>
          <Button
            className="flex-1"
            variant={display === "pending" ? "" : "secondary"}
            onClick={() => setDisplay("pending")}
          >
            Pending
          </Button>
          <Button
            className="flex-1"
            variant={display === "completed" ? "" : "secondary"}
            onClick={() => setDisplay("completed")}
          >
            Completed
          </Button>
        </div>
      </div>
    </>
  );
}
