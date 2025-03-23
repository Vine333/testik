import React, { useState, useEffect } from "react";
import { useShallow } from 'zustand/react/shallow';
import useSeminarStore from '../src/store/UseSeminarStore';
import { List, Input, Button } from "antd";

function App() {
    const { isLoad, loadSeminars, deleteSeminar, updateSeminar, items } = useSeminarStore(
        useShallow(state => ({
            isLoad: state.isLoad,
            loadSeminars: state.loadSeminars,
            deleteSeminar: state.deleteSeminar,
            updateSeminar: state.updateSeminar,
            items: state.items
        }))
    );

    const [editingId, setEditingId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    useEffect(() => {
        loadSeminars();
    }, [loadSeminars]);


    const handleEditClick = (item) => {
        setEditingId(item.id);
        setUpdatedTitle(item.title);
        setUpdatedDescription(item.description);
    };


    const handleSaveClick = () => {
        if (editingId) {
            updateSeminar(editingId, {
                title: updatedTitle,
                description: updatedDescription
            });
            setEditingId(null);
        }
    };

    return (
        <div className="App">
            <List
                loading={isLoad}
                dataSource={items}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            title={item.id === editingId ? (
                                <Input
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                            ) : (
                                item.title
                            )}
                            description={item.id === editingId ? (
                                <Input
                                    value={updatedDescription}
                                    onChange={(e) => setUpdatedDescription(e.target.value)}
                                />
                            ) : (
                                item.description
                            )}
                        />
                        <Button onClick={() => deleteSeminar(item.id)} danger>
                            Удалить
                        </Button>
                        {item.id === editingId ? (
                            <Button onClick={handleSaveClick} type="primary">
                                Сохранить
                            </Button>
                        ) : (
                            <Button onClick={() => handleEditClick(item)} type="default">
                                Редактировать
                            </Button>
                        )}
                    </List.Item>
                )}
            />
        </div>
    );
}

export default App;
