package eshiba.js;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class js_core_builder {
	public static void main(String [] argc) throws IOException {
		boolean ignoref = new File("ignored").createNewFile();
		ArrayList<String> ignore = new ArrayList<String>();
		String ignorelist = "";
		BufferedReader br_ignore = new BufferedReader(new FileReader("ignored"));
		
		String str = br_ignore.readLine();
		while (str != null) {
			if (str != null)	
				ignore.add(str);
				str = br_ignore.readLine();
		}	
		
		File jssrc = new File("srcjs/");
		File[] SrcFiles = jssrc.listFiles();
		
		String src = "";
		
		for(File f : SrcFiles) {
			boolean ignor = false;
			for(String ign : ignore) {
				if(ign.equals(f.getName()))ignor = true;
			}
			
			if(!ignor) {

				String path = f.getPath();
				System.out.println(path);
				
				try {
					BufferedReader br = new BufferedReader(new FileReader(path));					
					str = br.readLine();
					while (str != null) {
						if (str != null)
							if(!str.contains("//"))src = src + str; else {
								str = str.split("//")[0];
								if(str.length()>0)src = src + str;
							}
						str = br.readLine();
					}						
					
				} catch (FileNotFoundException e) {
					System.out.println("Ошибка чтения файла!");
					e.printStackTrace();
				}
			}
		}
		
		
		System.out.println("Загружено!");
		
		BufferedWriter bw = new BufferedWriter(new FileWriter("../electroniks2k19.js"));
		
		//src = src.replace("\n", "");
		
		
		for(int i = 2; i < 100;i++) {
			String s = "";
			for(int a = 0; a < i;a++)s = s + " ";
			src = src.replace(s, " ");
		}
		
		
		bw.append(src);
		bw.close();
	}
}
