"use client";
import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddProduct = () => {
  const [inpval, setInpval] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const PostData = async (e) => {
    e.preventDefault();
    const { title, price, image, description } = inpval;

    if (title == "") {
      toast.error("Title is Required", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (price === "") {
      toast.error("Price is Required.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (description === "") {
      toast.error("description is Required.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (image === "") {
      toast.error("image is Required", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await axios.post("http://localhost:3004/products", inpval).then((res) => {
        // console.log("dataaaaa", res);
        if (res) {
          setInpval({
            title: "",
            price: "",
            description: "",
            image: "",
          });
          toast.success("successfully added", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(" Failed", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  };

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInpval({
      ...inpval,
      [name]: value,
    });
  };

  return (
    <div>
      <Form>
        <ToastContainer />
        <Typography
          varient="h4"
          className="mt-8 text-center font-bold text-2xl text-gray-500"
        >
          Add Products
        </Typography>

        <FormControl>
          <InputLabel>Title</InputLabel>
          <Input
            type="text"
            name="title"
            value={inpval.title}
            onChange={setdata}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Price</InputLabel>
          <Input
            type="price"
            name="price"
            value={inpval.price}
            onChange={setdata}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Description</InputLabel>
          <Input
            type="description"
            name="description"
            value={inpval.description}
            onChange={setdata}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Image url</InputLabel>
          <Input
            text="image"
            name="image"
            value={inpval.image}
            onChange={setdata}
          />
        </FormControl>
        <FormControl>
          <Button
            onClick={PostData}
            variant="contained"
            className="bg-teal-600"
          >
            Add User
          </Button>
        </FormControl>
      </Form>
    </div>
  );
};

export default AddProduct;
