import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList, CardsProps, Card } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function getAPIValues({ pageParam = null }) {
    const resp = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return resp.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['listImages'],
    // TODO AXIOS REQUEST WITH PARAM
    getAPIValues,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage?.after || null,
    }
  );

  const formattedData: CardsProps = useMemo(() => {
    const cardsFormated = data?.pages.flatMap(cardsData => {
      return cardsData.data.flat();
    });

    return {
      cards: cardsFormated,
    };
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData.cards} />
        {
          /* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          hasNextPage && (
            <Button
              name="Carregar mais"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage && 'Carregando...'}
              {hasNextPage && 'Carregar mais'}
              {!hasNextPage && 'Nada mais para carregar'}
            </Button>
          )
        }
      </Box>
    </>
  );
}
