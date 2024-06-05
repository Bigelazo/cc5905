import ast

# Parse the Python code into an AST
parsed_ast = ast.parse("""
def foo(x: int[L]) -> int[H]:
    return x + 1
""")

# Iterate through the nodes in the parsed AST
for node in ast.walk(parsed_ast):
    # Check if the node is an instance of ast.FunctionDef
    if isinstance(node, ast.FunctionDef):
        # Print the type of the node
        print("Found a function definition.")
        print("Node type:", type(node))
        print("Function name:", node.name)
        # Inspecting the arguments and return type (if using Python 3.8+)
        print("Arguments:", [arg.arg for arg in node.args.args])
        print(dir(node.returns))
        if isinstance(node.returns, ast.Constant):  # Constant return type, Python 3.8+
            print("Return type:", node.returns.value)
        elif isinstance(node.returns, ast.Name):  # Named return type, e.g., 'int' or 'str'
            print("Return type:", node.returns.id)