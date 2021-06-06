import { createStore, createEffect } from 'effector'
import {post} from '../utils/api';




export const getExamFx = createEffect(async () => {
  const req = await post('api/exam/exam-info',{link: "123dsfsdf2"});
  return req;
})

export const examStore = createStore([])
  .on(getExamFx.done, (state, { result }) =>{return result})  