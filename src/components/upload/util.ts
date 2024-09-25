import { message } from 'antd';
import { supabaseClient } from 'util/supabaseClient';

export const uploadClone = async (
  folder: string,
  formData: FormData | null,
  prev: string | null,
) => {
  if (!formData && prev) {
    return null;
  } else if (formData?.get('file')) {
    const hexId = Date.now().toString(32);
    const { error } = await supabaseClient.storage
      .from('applausio')
      .upload(`${folder}/${hexId}`, formData, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      message.error('Error occured while uploading image');
      if (prev) {
        return prev;
      }
      return null;
    }
    return hexId;
  } else {
    const hexId = Date.now().toString(32);
    const { error } = await supabaseClient.storage
      .from('applausio')
      .copy(`${folder}/${prev}`, `${folder}/${hexId}`);
    if (error) {
      message.error('Error occured while copying image');
      return null;
    }
    return hexId;
  }
};

export const uploadCreate = async (
  folder: string,
  formData: FormData | null,
  prev?: string | null,
) => {
  let hexId = null;
  if (prev) {
    hexId = Date.now().toString(32);
    const { error } = await supabaseClient.storage
      .from('applausio')
      .copy(`${folder}/${prev}`, `${folder}/${hexId}`);
    if (error) {
      message.error('Error occured while copying image');
      return null;
    }
    return hexId;
  }
  if (formData?.get('file')) {
    hexId = Date.now().toString(32);
    const { error } = await supabaseClient.storage
      .from('applausio')
      .upload(`${folder}/${hexId}`, formData, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      message.error('Error occured while uploading image');
      return null;
    }
  }
  return hexId;
};

export const uploadEdit = async (
  folder: string,
  formData: FormData | null,
  prev: string | null,
) => {
  if (!formData && prev) {
    const { error } = await supabaseClient.storage
      .from('applausio')
      .remove([`${folder}/${prev}`]);
    if (error) {
      message.error('Error occured while removing image');
      return prev;
    }
    return null;
  } else if (formData?.get('file')) {
    const hexId = Date.now().toString(32);
    if (prev) {
      const { error } = await supabaseClient.storage
        .from('applausio')
        .remove([`${folder}/${prev}`]);
      if (error) {
        message.error('Error occured while removing image');
        return prev;
      }
    }
    const { error } = await supabaseClient.storage
      .from('applausio')
      .upload(`${folder}/${hexId}`, formData, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      message.error('Error occured while uploading image');
      return null;
    }
    return hexId;
  }
  return prev;
};
