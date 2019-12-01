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
}
