import { reset } from '../slices/authSlice';
import { AppDispatch, RootState } from '../store';


export const resetComponentMessage = (dispatch: AppDispatch) => {
    setTimeout(() => {
        dispatch(reset());
    }, 3000);
}