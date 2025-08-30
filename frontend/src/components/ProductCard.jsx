import React from "react";
import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  Button,
  CloseButton,
  Portal,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Dialog } from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
      });
    }
  };
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (success) setIsOpen(false);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product updated succesfully",
        type: "success",
        closable: true,
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen} size="md">
            <Dialog.Trigger asChild>
              <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
                <FaEdit fontSize={20} />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      colorScheme="blue"
                      onClick={() =>
                        handleUpdateProduct(product._id, updatedProduct)
                      }
                    >
                      Update
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Button>
            <MdDelete
              fontSize={20}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
            />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
