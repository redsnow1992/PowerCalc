const display = document.getElementById('display');
const resultContainer = document.getElementById('result');
const calculateBtn = document.getElementById('calculate');
const clearBtn = document.getElementById('clear');
const historyTableBody = document.getElementById('history').querySelector('tbody');

const history = []; // 用于存储最近的计算结果

// 验证输入的合法性
function isValidExpression(expr) {
    const validChars = /^[0-9+\-*^/(). ]+$/; // 只允许数字和基本运算符
    return validChars.test(expr);
}

// 计算表达式
function calculate(expr) {
    if (!isValidExpression(expr)) {
        alert('Input contains invalid characters, please try again!');
        return null;
    }
    
    try {
        const result = math.evaluate(expr);
        return result;
    } catch (error) {
        alert('Calculation error, please check the expression!');
        return null;
    }
}

// 更新历史记录表
function updateHistory(expr, result) {
    history.unshift({ expr, result }); // 将新的结果添加到历史记录开头
    
    if (history.length > 10) {
        history.pop(); // 保持历史记录最多为10条
    }
    
    renderHistory();
}

// 渲染历史记录到表格
function renderHistory() {
    historyTableBody.innerHTML = ''; // 清空表格内容
    history.forEach(entry => {
        const row = document.createElement('tr');
        const exprCell = document.createElement('td');
        const resultCell = document.createElement('td');
        
        exprCell.textContent = entry.expr;
        resultCell.textContent = entry.result;
        
        row.appendChild(exprCell);
        row.appendChild(resultCell);
        historyTableBody.appendChild(row);
    });
}

// 计算按钮事件
calculateBtn.addEventListener('click', () => {
    const input = display.value;
    const result = calculate(input);
    if (result !== null) {
        resultContainer.textContent = `Result: ${result}`;
        updateHistory(input, result); // 更新历史记录
    }
});

// 清空按钮事件
clearBtn.addEventListener('click', () => {
    display.value = '';
    resultContainer.textContent = '';
});

// 支持键盘输入
display.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        calculateBtn.click();
        event.preventDefault(); // 防止提交表单
    }
});
