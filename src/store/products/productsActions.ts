import { Action, ActionWithPayload, createAction } from "utils/redux/reduxUtils";
import { productsActionTypes } from "./productsActionTypes";
import { ProductsResponse } from "types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store/store";
import { useGetProducts } from "pages/OnlineShop/hooks/useProducts";
import { getProducts } from "utils/actions/productActions";

type FetchProductsStart = Action<productsActionTypes.FETCHING_PRODUCTS_START>
type FetchProductsFailed = ActionWithPayload<productsActionTypes.FETCHING_PRODUCTS_FAILED, Error>
type FetchProductsSuccess = ActionWithPayload<productsActionTypes.FETCHING_PRODUCTS_SUCCESS, ProductsResponse>

export type ProductsAction = FetchProductsStart | FetchProductsFailed | FetchProductsSuccess;

const fetchProductsStart = (): FetchProductsStart => createAction(productsActionTypes.FETCHING_PRODUCTS_START);
const fetchProductsFailed = (error: Error): FetchProductsFailed => createAction(productsActionTypes.FETCHING_PRODUCTS_FAILED, error);
const fetchProductsSuccess = (categories: ProductsResponse): FetchProductsSuccess => createAction(productsActionTypes.FETCHING_PRODUCTS_SUCCESS, categories);

export const fetchProductsAsync = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());
        const products=await getProducts()
        return dispatch(fetchProductsSuccess(products ?? []))

    } catch (error: any) {
        return dispatch(fetchProductsFailed(error))

    }

}