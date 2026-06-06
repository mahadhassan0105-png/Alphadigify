/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { name, email, currentPassword, newPassword } = body;

    // Fetch the current user record
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ success: false, error: "User profile not found." }, { status: 444 });
    }

    const updateData: any = {};

    // Handle Name Update
    if (name && name.trim()) {
      updateData.name = name.trim();
    }

    // Handle Email Update
    if (email && email.trim() && email.trim() !== user.email) {
      const emailLower = email.trim().toLowerCase();
      // Check if email already belongs to another user
      const duplicate = await db.user.findUnique({ where: { email: emailLower } });
      if (duplicate) {
        return NextResponse.json({ success: false, error: "Email address is already in use by another account." }, { status: 400 });
      }
      updateData.email = emailLower;
    }

    // Handle Password Update
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ success: false, error: "Current password is required to change password." }, { status: 400 });
      }

      // Verify old password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: "Incorrect current password." }, { status: 400 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json({ success: false, error: "New password must be at least 6 characters long." }, { status: 400 });
      }

      // Hash and set new password
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // If nothing has changed
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, message: "No changes detected." });
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error: any) {
    console.error("PUT PROFILE ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile settings." }, { status: 500 });
  }
}
