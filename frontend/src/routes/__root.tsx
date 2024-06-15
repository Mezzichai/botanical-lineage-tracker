import { createRootRoute, Outlet } from '@tanstack/react-router';
import InfoCard from '../features/InfoCard/components/InfoCard';
import Header from '../features/header/components/Header';
import { selectCatagory, selectId } from '../features/InfoCard/InfoCardSlice';
import { useSelector } from 'react-redux';

const RouteComponent = () => {
  const catagory = useSelector(selectCatagory);
  const cardId = useSelector(selectId);

  return (
    <>
      <Header />
      <Outlet />
      <InfoCard key={catagory + cardId} />
    </>
  );
};

export const Route = createRootRoute({
  component: RouteComponent
});