"use client";

import { useUserStore } from "@/src/hooks/useUserStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

export const ProfileComponent = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>الملف الشخصي</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">لا يوجد مستخدم مسجل الدخول</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>الملف الشخصي</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">الاسم</p>
          <p className="font-medium">{user.name}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-gray-500">البريد الإلكتروني</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-gray-500">رقم الهاتف</p>
          <p className="font-medium">{user.phone}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-gray-500">الرقم القومي</p>
          <p className="font-medium">{user.national_id}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-gray-500">نوع المستخدم</p>
          <Badge variant="outline">{user.user_type}</Badge>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-gray-500">الحالة</p>
          <Badge className={user.is_active ? "bg-green-500" : "bg-red-500"}>
            {user.is_active ? "نشط" : "غير نشط"}
          </Badge>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-gray-500">تاريخ الإنشاء</p>
          <p className="font-medium">
            {new Date(user.created_at).toLocaleDateString("ar-EG")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
