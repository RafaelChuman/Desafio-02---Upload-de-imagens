import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const modalViewImageDisclosure = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleViewImage = (url: string): void => {
    setSelectedImage(url);
    modalViewImageDisclosure.onOpen();
  };

  return (
    <>
      <>
        {
          /* TODO CARD GRID */
          cards.map(card => {
            return (
              <SimpleGrid columns={3} spacing={40}>
                <Card key={card.id} data={card} viewImage={handleViewImage} />
              </SimpleGrid>
            );
          })
        }
      </>
      {
        /* TODO MODALVIEWIMAGE */
        <ModalViewImage
          isOpen={modalViewImageDisclosure.isOpen}
          onClose={modalViewImageDisclosure.onClose}
          imgUrl={selectedImage}
        />
      }
    </>
  );
}
