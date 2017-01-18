import { Schema } from 'normalizr';

export const apiSchema = new Schema('apis', { idAttribute: 'id' });
export const requestSchema = new Schema('requests', { idAttribute: 'id' });
export const pluginsSchema = new Schema('plugins', { idAttribute: 'id' });
