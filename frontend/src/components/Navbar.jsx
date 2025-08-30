import { Container, Flex, Text, HStack, Button } from '@chakra-ui/react';
import { PiPlusSquareThin } from "react-icons/pi";
import { useColorMode } from "@/components/ui/color-mode"
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return ( <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm: "row"
            }
                

            }
        
        >
            <Text
                bgGradient='linear(to-r, cyan.400, blue.500)' fontSize= 'xl' fontWeight='bold'
            >
                
                 <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Bakery🍞
          </RouterLink>
                
                
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <RouterLink to="/create">
            <Button>
              <PiPlusSquareThin fontSize={20} />
            </Button>
          </RouterLink>
                <Button onClick={toggleColorMode} >
                    {colorMode === "light" ? "🌙" : "☀️"}
                </Button>

            </HStack>
            
            



        </Flex>

    </Container>
    );
};
export default Navbar;