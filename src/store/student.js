import { createStore,createEvent, createEffect } from 'effector'
import {post} from '../utils/api';


export const selectIin = createEvent();
export const getOrderCodeFx = createEffect(async params => {
  const req = await post('api/exam/exam-info',{
    method: "student_add",
    iin: params.iin,
    phone: params.phone,
    branch_id: params.branch_id,
    service_id: params.service_id,
    dateFormat: params.dateFormat

  });
  return req;
})


export const orderStore = createStore(false)
  .on(getOrderCodeFx.done, (state,{result}) => {
    return result;
  })