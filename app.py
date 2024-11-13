from flask import Flask, render_template, redirect, url_for, request, session
from flask_mysqldb import MySQL, MySQLdb
from datetime import time


app = Flask(__name__,template_folder='Templates')


app.config['MYSQL_HOST']='127.0.0.1'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='LEONguruciaga162'
app.config['MYSQL_DB']='login'
app.config['MYSQL_PORT'] = 3307
app.config['MYSQL_CURSORCLASS']='DictCursor'
app.secret_key = 'LEONguruciaga162'
mysql=MySQL(app)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/MisTareas')
def mis_tareas():
    return render_template('MisTareas.html')

@app.route('/tarea')
def nueva_tarea():
    return render_template('tarea.html')

@app.route('/contacto')
def contacto():
    return render_template('contact.html')

@app.route('/crear_tarea', methods=['GET', 'POST'])
def crear_tarea():
    if request.method == 'POST':
        nombre = request.form['nombre']
        dia = int(request.form['dia'])
        mes = int(request.form['mes'])
        anio = int(request.form['anio'])
        descripcion = request.form['descripcion']
        empieza = request.form['empieza']
        termina = request.form['termina']
        if nombre and dia and mes and anio and descripcion and empieza and termina:
            cursor = mysql.connection.cursor()
            query = """
                    INSERT INTO tareas (nombre, dia, mes, anio, descripcion, empieza, termina)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
            cursor.execute(query, (nombre, dia, mes, anio, descripcion, empieza, termina))
            mysql.connection.commit()
            cursor.close()
            return redirect(url_for('crear_tarea')) 
    return render_template('tarea.html')
    
@app.route('/crear_registro', methods=["GET","POST"])
def crear_registro():
    
    _nombre = request.form['nombre']
    _apellido = request.form['apellido']
    _gmail = request.form['gmail']
    _password = request.form['password']
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT id_usuario FROM usuarios WHERE gmail = %s", (_gmail,))
    user = cur.fetchone()
    
    if user:
        return render_template('register.html', mensaje3="ya tienes una cuenta con este correo")
    else:
        cur.execute(" INSERT INTO usuarios (nombre, apellido, gmail, contraseña) VALUES (%s, %s, %s, %s)", (_nombre, _apellido, _gmail, _password))
        mysql.connection.commit()
        return render_template('login.html', mensaje2="usuario registrado exitosamente!")
    

@app.route('/calendar')
def calendario():
    if 'logueado' in session and session['logueado'] is True:
        return render_template('calendar.html')  
    else:
        return redirect(url_for('login'))

@app.route('/acceso_login', methods=["GET","POST"])
def acceso_login():
    
    if request.method == 'POST' and 'gmail' in request.form and 'password' in request.form:
        _gmail = request.form['gmail']
        _password = request.form['password']
        
        cur=mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE gmail = %s AND contraseña = %s', (_gmail, _password,))
        account = cur.fetchone()
        
        if account:
            session['logueado'] = True
            session['id_usuario'] = account['id_usuario']
            
            return render_template('calendar.html')
        else:
            return render_template('login.html', mensaje="usuario incorrecto")
      

if __name__ == '__main__':
    app.secret_key="123qweasd"
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)

