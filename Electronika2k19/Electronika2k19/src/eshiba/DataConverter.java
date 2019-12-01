package eshiba;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * Конвертирует типы данных
 * @author StormProject
 *
 */
public class DataConverter {
	
	/**
	 * Переводит байт в массив boolean
	 * @param var
	 * @return
	 */
	public static boolean [] ByteToBool(byte var) 
	{
		int size = 8;	
		boolean output[] = new boolean[size];					
		for (int i = 0; i < size; i++) 
		{
			output[i] = (boolean)(((byte)var & (1 << size-1-i)) != 0);
		}
		return output;
	}

	
    /**
     * Переводит short в массив boolean
     * @param var
     * @return
     */
	public static boolean [] Int16ToBool(short var) 
	{
		int size = 16;	
		boolean output[] = new boolean[size];					
		for (int i = 0; i < size; i++) 
		{
			output[i] = (boolean)(((short)var & (1 << size-1-i)) != 0);
		}
		return output;
	}
	

	/**
	 * Переводит Int в массив boolean
	 * @param var
	 * @return
	 */
	public static boolean [] Int32ToBool(int var) 
	{
		int size = 32;	
		boolean output[] = new boolean[size];					
		for (int i = 0; i < size; i++) 
		{
			output[i] = (boolean)((var & (1 << size-1-i)) != 0);
		}
		return output;
	}
	

	/**
	 * Переводит массив boolean[8] в Byte
	 * @param var ВДлина массива = 8
	 * @return
	 */
	public static byte BoolToByte(boolean [] var) 
	{
		int size = 8;
		byte output = Byte.MIN_VALUE;		
		for(int i = 0; i < size;i++) 
		{		
			if(var[size-1-i]==true)output=(byte)(output+(byte)(Math.pow(2, i)));
		}	
		return (byte)(output + 1);
	}
	
	/**
	 * Переводит массив boolean[16] в Short
	 * @param var Длина массива = 16
	 * @return
	 */
	public static short BoolToInt16(boolean [] var) 
	{
		int size = 16;
		short output = Short.MIN_VALUE;
		
		for(int i = 0; i < size;i++) 
		{		
			if(var[size-1-i]==true)output=(short)(output+(short)(Math.pow(2, i)));
		}		
		return (short)(output+1);
	}
	
	/**
	 * Переводит массив boolean[32] в Int
	 * @param var Длина массива = 32
	 * @return
	 */
	public static int BoolToInt32(boolean [] var) 
	{
		int size = 32;
		int output = 0;	
		for(int i = 0; i < size;i++) 
		{		
			if(var[size-1-i]==true)output=(output+(int)(Math.pow(2, i)));
		}			
		return output;
	}
	
	/**
	 * Переводит 2 Byte в Short
	 * @param H Старший байт
	 * @param L Младший байт
	 * @return
	 */
	public static short Byte2ToShort(byte H, byte L) 
	{
	   short output;	  
	   output = (short)((256*H)+L);
	   return output;	   
	}
	
	
	/**
	 * Переводит массив 2 Byte в Short
	 * @param var Длина массива = 2
	 * @return
	 */
	public static short Byte2ToShort(byte [] var) 
	{		
	   return Byte2ToShort(var[0],var[1]);	   
	}
	
	
	/**
	 * Переводит 4 Byte в Int
	 * @param B3 3 Байт
	 * @param B2 2 Байт
	 * @param B1 1 Байт
	 * @param B0 0 Байт
	 * @return
	 */
	public static int Byte4ToInt32(byte B0, byte B1, byte B2, byte B3) 
	{
	   int output;
		
	   output = 0xFF&B3 ;
	   output = output + (0xFF&B2) * 0xFF;
	   output = output + (0xFF&B1) * 0xFFFF;
	   output = output + (0xFF&B0) * 0xFFFFFF;
		
	   return output;	   
	}
	
	/**
	 * Переводит Int в 4 байта
	 * @param var
	 * @return
	 */
	public static byte[] IntTo4Byte(int var) 
	{
		byte [] output = new byte[4];
		output[0] = (byte)((var / 0xFFFFFF));
		output[1] = (byte)((((var - (output[0] * 0xFFFFFF))/0xFFFF)));
		output[2] = (byte)((((var - (output[0] * 0xFFFFFF) - (output[1] * 0xFFFF))/0xFF)));
		output[3] = (byte)(((var - (output[0] * 0xFFFFFF) - (output[1] * 0xFFFF) - (output[2] * 0xFF))));
		return output;
	}
	
	/**
	 * Переводит 4 Byte в Int
	 * @param var Длина массива = 4
	 * @return
	 */
	public static int Byte4ToInt32(byte [] var) 
	{
		return Byte4ToInt32(var[0],var[1],var[2],var[3]);
	}
	
	
	/**
	 * Переводит Short в 2 байта
	 * @param var
	 * @return
	 */
	public static byte[] ShortTo2Byte(short var) 
	{	
		byte output[] = new byte[2];	
		output[0] = (byte)(((var & 0xFFFF) / 256));	
		output[1] = (byte)((var & 0xFFFF - (output[0] * 256)));							
		return output;
	}
	
	
	public static byte CharToByte(char in) 
	{
		String str = String.valueOf(in);
		try {
			return str.getBytes("ISO-8859-5")[0];
		} catch (UnsupportedEncodingException e) {
			new Exception("Ошибка конфертирования символа в байт");
			e.printStackTrace();
		}
		return 0;
	}
	
	public static char ByteToChar(byte in) 
	{
		String str = "";
		try {
			str = new String(new byte[] {in}, "ISO-8859-5");
			return str.toCharArray()[0];
		} catch (UnsupportedEncodingException e) {
			new Exception("Ошибка конфертирования байта в символ");
			e.printStackTrace();
		}
		return ' ';
	}

	
	
	

	
	

	
}
