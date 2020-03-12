//VERSION 1.3
//#1.1 Добавил Split
//#1.2 Добавил MultiSplit
//#1.3 Добавил Split по Char

package eshiba;

import java.util.ArrayList;

public class string {
	public static String replase(String in, String s, String s2) 
	{		
		byte [] in_buf = in.getBytes();
		byte [] out_buf = new byte[in_buf.length];
		
		for(int i = 0; i < in.length();i++)
		{
			if(in_buf[i] != s.getBytes()[0]) 
			{
				out_buf[i] =  in_buf[i];
			}else 
			{
				out_buf[i] = s2.getBytes()[0];
			}
		}	
		return new String(out_buf);
	}
	
	public static String delfrom(String in, String key) 
	{
		byte [] in_buf = in.getBytes();		
		ArrayList<Byte> buf = new ArrayList<Byte>();		
		for(int i = 0; i < in.length();i++)
		{
			if(in_buf[i] != key.getBytes()[0]) 
			{
				buf.add(in_buf[i]);
			}
		}			
		byte [] out_buf = new byte[buf.size()];		
		for(int i =0; i < buf.size();i++)out_buf[i] = buf.get(i);				
		return new String(out_buf);
	}

	public static String delfrom(String in, char c) {		 
		return delfrom(in, String.valueOf(c)); 
	}
	
	
	public static String [] split(String in, char key) {
		String key0 = String.valueOf(key);
		return split(in,key0);
	}
	
	
	public static String [] split(String in, String key) {
		ArrayList<String> OUT = new ArrayList<String>();
		
		byte [] in_buf = in.getBytes();		
		ArrayList<Byte> buf = new ArrayList<Byte>();	
		
		for(int i = 0; i < in.length();i++)
		{
			if(in_buf[i] != key.getBytes()[0]) { 
				buf.add(in_buf[i]);
			}else {
				byte [] out_buf = new byte[buf.size()];		
				for(int ii =0; ii < buf.size();ii++)out_buf[ii] = buf.get(ii);
				OUT.add(new String(out_buf));
				buf = new ArrayList<Byte>();	
			}
		}
		
		byte [] buf2 = new byte[buf.size()];		
		for(int ii =0; ii < buf.size();ii++)buf2[ii] = buf.get(ii);
		OUT.add(new String(buf2));
		
		String [] out_buf = new String[OUT.size()];	
		for(int ii =0; ii < OUT.size();ii++)out_buf[ii] = OUT.get(ii);
		
		return out_buf;
	}
	
	
	public static String [] MultiSplit(String in, String... key_arr) {
		ArrayList<String> OUT = new ArrayList<String>();
		
		byte [] in_buf = in.getBytes();		
		ArrayList<Byte> buf = new ArrayList<Byte>();	
		
	
		for(int i = 0; i < in.length();i++)
		{
			boolean find = false;
			for(String key : key_arr) {
			if(!find) {	
				if(in_buf[i] == key.getBytes()[0]) { 
					find = true;
					byte [] out_buf = new byte[buf.size()];		
					for(int ii =0; ii < buf.size();ii++)out_buf[ii] = buf.get(ii);
					OUT.add(new String(out_buf));
					buf = new ArrayList<Byte>();	
				}
					
			}
			}
			
			if(!find)buf.add(in_buf[i]);
		}
		
		byte [] buf2 = new byte[buf.size()];		
		for(int ii =0; ii < buf.size();ii++)buf2[ii] = buf.get(ii);
		OUT.add(new String(buf2));
		
		String [] out_buf = new String[OUT.size()];	
		for(int ii =0; ii < OUT.size();ii++)out_buf[ii] = OUT.get(ii);
		
		return out_buf;
	}
	
	
	
}
