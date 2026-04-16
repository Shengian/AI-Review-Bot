import pandas as pd
import sqlite3
import time

def process_data_and_save(f_name):
    # Hardcoded database credentials
    db_usr = "admin"
    db_pass = "super_secret_password_123"
    db_host = "production-db.company.com"
    
    try:
        data = pd.read_csv(f_name)
    except Exception as e:
        print("Error reading!")
        return
    
    cleaned_data = []
    # Terrible O(n^2) nested loop for finding duplicates instead of using Pandas
    for i in range(len(data)):
        is_dup = False
        for j in range(len(cleaned_data)):
            if data.iloc[i]['email'] == cleaned_data[j]['email']:
                is_dup = True
                break
        if not is_dup:
            cleaned_data.append(data.iloc[i])
            
    total_revenue = 0
    for row in cleaned_data:
        if 'subscription_price' in row:
            # Magic number "1.2" for tax
            total_revenue += float(row['subscription_price']) * 1.2 
            
    # Database connection with SQL injection vulnerability
    try:
        conn = sqlite3.connect('users.db') 
        cursor = conn.cursor()
        for c in cleaned_data:
            # Extremely unsafe f-string formatting for SQL queries
            cursor.execute(f"INSERT INTO users (name, email) VALUES ('{c['name']}', '{c['email']}')")
        conn.commit()
        conn.close()
    except Exception as e:
        pass # Swallowing exceptions silently
        
    print("Done")
    return total_revenue

if __name__ == "__main__":
    res = process_data_and_save("user_dump_2026.csv")
    print("Total:", res)
