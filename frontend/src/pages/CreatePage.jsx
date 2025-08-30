import React from 'react'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from "/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";


const CreatePage = () => {
const [newProduct, setNewProduct] = useState({
 		name: "",
 		price: "",
 		image: "",
 	});

const {createProduct} = useProductStore();    
const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);
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
        setNewProduct({ name: "", price: "", image: "" });
};

  
  return (
    <Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>

                
                <VStack spacing={4}>
                    <Input
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
                      
                </VStack>
            </Box>

				
            </VStack>
    </Container>

  );
  
};
  

export default CreatePage;


// 	//const toast = useToast();

// 	//const { createProduct } = useProductStore();


// 	return (
// 		<Container maxW={"container.sm"}>
// 			{/* {/* <VStack spacing={8}>
// 				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
// 					Create New Product
// 				</Heading>

// 				<Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
// 					<VStack spacing={4}>
// 						<Input
// 							placeholder='Product Name'
// 							name='name'
// 							value={newProduct.name}
// 							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
// 						/>
// 						<Input
// 							placeholder='Price'
// 							name='price'
// 							type='number'
// 							value={newProduct.price}
// 							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
// 						/>
// 						<Input
// 							placeholder='Image URL'
// 							name='image'
// 							value={newProduct.image}
// 							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
// 						/>
// 					</VStack>
// 				</Box> */}
			
// 		</Container>
// 	);
// };
// export default CreatePage;