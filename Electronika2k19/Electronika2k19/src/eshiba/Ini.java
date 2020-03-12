//VERSION 1.0

package eshiba;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

public class Ini {
	String PATH = "";
	
	public HashMap<String, HashMap<String, String>> SECTION = null;  // new HashMap<String, HashMap<String,String>>();
	public HashMap<String, HashMap<String, String>> COMMENT = null;   
	HashMap<Integer, String> comment = null;
	
	
	public static void main(String [] argc) throws IOException {
		Ini ini = new Ini("testini.ini");	
		ini.Write("worldserver","Metric.ConnectionInfo", "Hello Eshiba!");
		System.out.println(ini.Read("worldserver","Metric.ConnectionInfo"));
		System.out.println(ini.GetComment("worldserver","Metric.ConnectionInfo"));
		ini.SaveFile();
	}
	
	public Ini(String path) throws IOException {	
		PATH = path;
		Parse(ReadFile(path));
	}
	
	//Читает файл целиком
	String ReadFile(String path) throws IOException{
		int no_comment_counter = 0;
		
		SECTION = new HashMap<String, HashMap<String,String>>();
		COMMENT = new HashMap<String, HashMap<String,String>>();
		comment = new HashMap<Integer, String>();

		
		  String filesrc = "";	
		  BufferedReader br = new BufferedReader(new FileReader(new File(path)));   
		  String st; 	  
		  String comment_src = "";
		  while ((st = br.readLine()) != null) {
			  if(st.length()>0) {
			  if(st.charAt(0)=='#'||st.charAt(0)==';')
				  comment_src = comment_src + st + "\n";
			  if(st.charAt(0)!='#'&st.charAt(0)!=';') {
				  filesrc = filesrc + st + "\n";
				  no_comment_counter++;
				  comment.put(no_comment_counter, comment_src);
				  comment_src = "";
				  }
			  }
		  }
		  br.close();
		  return filesrc;
		  } 
	
	//Парсит файл
	 public void Parse(String filesrc){
		
		 int no_comment_counter = 1;
		
		String [] section_src = filesrc.split("\\[");
		
		for(String section_stroke : section_src) {
			String [] section = section_stroke.split("]");
			if(section.length > 1) {
				
			String section_name = section[0];	
			SECTION.put(section_name, new HashMap<String, String>());
			COMMENT.put(section_name, new HashMap<String, String>());
			COMMENT.get(section_name).put("SECTION_COMMENT", comment.get(no_comment_counter));		
			no_comment_counter++;
				
			String [] keys_src = section[1].split("\n");
			if(keys_src.length > 1) {
			for(String key_src : keys_src) {
				String [] key = key_src.split("=");
				if(key.length > 1) {
					key[0] = string.delfrom(key[0], ' ');
					SECTION.get(section_name).put(key[0], key[1]);
					COMMENT.get(section_name).put(key[0], comment.get(no_comment_counter));
					no_comment_counter++;
				}

				
			}
			}
		}
		}
	}
		
	 //Считать значение
	 public String Read(String section,String key) {
		return SECTION.get(section).get(key); 
	 }
	 
	 //Получить комментарий
	 public String GetComment(String section,String key) {
		return COMMENT.get(section).get(key); 
	 }
	 
	 //Записать значение
	 public void Write(String section,String key, String value) {
		 String old = SECTION.get(section).get(key);
		 SECTION.get(section).put(key,value);
	 }
	 
	 public void SaveFile() throws IOException {
		 FileWriter writer = new FileWriter(PATH, false);
		 Set<String> section_names = SECTION.keySet();
		 for(String section : section_names) {
			 writer.append(COMMENT.get(section).get("SECTION_COMMENT")+"\n");
			 writer.append("[" + section +  "]"+"\n");
			 Set<String> key_names = SECTION.get(section).keySet();
			 for(String key : key_names) {				
				 writer.append(COMMENT.get(section).get(key)+"\n");
				 writer.append(key + " = ");
				 writer.append(SECTION.get(section).get(key)+"\n");
			 }
		 }
		 writer.close();
	 }
}


