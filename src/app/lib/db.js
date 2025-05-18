"use server";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon('postgresql://axamine_owner:npg_YStnb5PMVk3u@ep-gentle-unit-a2z23hab-pooler.eu-central-1.aws.neon.tech/axamine?sslmode=require');
const testDBConnection  = async()=>{

    try{
        await sql`SELECT 1`; 
        // console.log("✅ DB connected successfully");
        return NextResponse.json({status: 'success', message: "DB connected successfully" });
    }catch(error){
        
        return NextResponse.json({ status: 'fail',message: "Error to connect DB" });
    }
    
}  
testDBConnection();
export {sql};
