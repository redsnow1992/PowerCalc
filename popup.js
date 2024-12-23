const display = document.getElementById('display');
const resultContainer = document.getElementById('result');
const calculateBtn = document.getElementById('calculate');
const clearBtn = document.getElementById('clear');
const historyTableBody = document.getElementById('history').querySelector('tbody');

const history = JSON.parse(localStorage.getItem('history')) || []; // 从localStorage加载历史记录

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
        saveToHistory(expr, result);
        return result;
    } catch (error) {
        alert('Error in calculation, please check your expression!');
        return null;
    }
}

// 保存到历史记录并存储到localStorage
function saveToHistory(expr, result) {
    const entry = { expression: expr, result: result };
    history.push(entry);
    if (history.length > 5) {
        history.shift(); // 保持历史记录只保留最新的10条
    }
    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryTable();
}

// 更新历史记录表格
function updateHistoryTable() {
    historyTableBody.innerHTML = '';
    const reversedHistory = [...history].reverse(); // 倒序显示历史记录
    reversedHistory.forEach(entry => {
        const row = document.createElement('tr');
        const exprCell = document.createElement('td');
        const resultCell = document.createElement('td');
        exprCell.textContent = entry.expression;
        resultCell.textContent = entry.result;
        row.appendChild(exprCell);
        row.appendChild(resultCell);
        historyTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', updateHistoryTable);

// 计算按钮事件
calculateBtn.addEventListener('click', () => {
    const input = display.value;
    const result = calculate(input);
    if (result !== null) {
        resultContainer.textContent = `Result: ${result}`;
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
