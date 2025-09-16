import { RichTextEditor } from '@/components/admin/Editor/RichTextEditor';
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