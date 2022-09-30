import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Box,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="pGray.900" mx="auto" w="auto" h="auto">
        <ModalBody p="0">
          <Box maxW="900px" maxH="600">
            <Image maxW="900px" maxH="600" src={imgUrl} objectFit="contain" />
            <Box
              height="2rem"
              backgroundColor="#353431"
              borderBottomRadius="5px"
            >
              <Link
                href={imgUrl}
                marginLeft="10px"
                marginTop="10px"
                paddingTop="8px"
                isExternal
                fontSize="1rem"
              >
                Abrir original
              </Link>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
