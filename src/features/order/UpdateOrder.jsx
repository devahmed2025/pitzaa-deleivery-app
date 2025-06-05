import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { useEffect } from 'react';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="order" size="sm">
        🚨 Make Priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

//we need to update form we use ? action
export async function action({ request, params }) {
  const data = { priority: true };
//   console.log('data is', data);
  const id = params.orderId;
//   console.log('id var in our route', id);
    await updateOrder(id, data);
  return null;
}
