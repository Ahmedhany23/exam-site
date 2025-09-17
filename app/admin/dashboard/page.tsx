import { RichTextEditor } from '@/tools/Editor/RichTextEditor';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Dashboard",
};
const page = () => {
  return (
   <RichTextEditor/>
  )
}

export default page