from flask import Flask, render_template

app = Flask(__name__)

@app.route('/index.html') 
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='192.168.43.125', port=3003, debug=True)  # Set the host to your IP address
